import React, { useState } from 'react';
import { spacing, typography, colors } from '../../styles/sage/tokens';
import { Modal } from './Modal';
import { Input } from './Input';
import { Select } from './Select';
import { User } from '../../utils/storage';
import { t, Lang, getRoleLabel } from '../../utils/sageStrings';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (user: Omit<User, 'id' | 'createdAt'>) => void;
  /** Roles the current viewer is allowed to assign */
  availableRoles: Array<User['role']>;
  /** Departments the current viewer is allowed to assign, beyond 'General' (which every user gets) */
  availableDepartments: string[];
  /** When set, departments are locked to General + this value (e.g. an Admin adding a user in their own department) */
  lockedDepartment?: string;
  language?: Lang;
}

export const AddUserModal: React.FC<AddUserModalProps> = ({
  isOpen,
  onClose,
  onCreate,
  availableRoles,
  availableDepartments,
  lockedDepartment,
  language,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<User['role']>(availableRoles[0] || 'user');
  const assignableDepartments = availableDepartments.filter((d) => d !== 'General');
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>(
    lockedDepartment && lockedDepartment !== 'General' ? [lockedDepartment] : []
  );
  const [error, setError] = useState('');

  const toggleDepartment = (dept: string) => {
    if (lockedDepartment) return;
    setSelectedDepartments((prev) =>
      prev.includes(dept) ? prev.filter((d) => d !== dept) : [...prev, dept]
    );
  };

  const reset = () => {
    setName('');
    setEmail('');
    setRole(availableRoles[0] || 'user');
    setSelectedDepartments(lockedDepartment && lockedDepartment !== 'General' ? [lockedDepartment] : []);
    setError('');
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = () => {
    if (!name.trim() || !email.trim()) {
      setError(t(language, 'fillNameEmail'));
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError(t(language, 'invalidEmail'));
      return;
    }

    onCreate({
      name: name.trim(),
      email: email.trim(),
      role,
      // 'General' is common to every user, plus any additional departments selected
      departments: Array.from(new Set(['General', ...selectedDepartments])),
    });
    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={t(language, 'addUserTitle')}
      size="sm"
      actions={[
        { label: t(language, 'cancel'), variant: 'secondary', onClick: handleClose },
        { label: t(language, 'addUser'), variant: 'primary', onClick: handleSubmit },
      ]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
        <Input label={t(language, 'name')} value={name} onChange={(e) => setName(e.target.value)} required placeholder="Jane Doe" />
        <Input
          label={t(language, 'email')}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="jane.doe@gmail.com"
        />
        <Select
          label={t(language, 'role')}
          value={role}
          onChange={(e) => setRole(e.target.value as User['role'])}
          options={availableRoles.map((r) => ({ label: getRoleLabel(r, language), value: r }))}
        />
        <div>
          <label style={{ display: 'block', marginBottom: spacing.sm, fontWeight: 600 }}>{t(language, 'departmentsLabel')}</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.xs }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: spacing.xs, color: colors['neutral-500'] }}>
              <input type="checkbox" checked disabled />
              {t(language, 'generalAllUsers')}
            </label>
            {assignableDepartments.map((dept) => (
              <label key={dept} style={{ display: 'flex', alignItems: 'center', gap: spacing.xs }}>
                <input
                  type="checkbox"
                  checked={!!lockedDepartment || selectedDepartments.includes(dept)}
                  disabled={!!lockedDepartment}
                  onChange={() => toggleDepartment(dept)}
                />
                {dept}
              </label>
            ))}
          </div>
        </div>
        {error && (
          <div style={{ fontSize: typography.fontSize['body-xs'], color: colors['error-red'] }}>{error}</div>
        )}
      </div>
    </Modal>
  );
};

AddUserModal.displayName = 'AddUserModal';
