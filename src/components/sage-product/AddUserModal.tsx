import React, { useState } from 'react';
import { spacing, typography, colors } from '../../styles/sage/tokens';
import { Modal } from './Modal';
import { Input } from './Input';
import { Select } from './Select';
import { User } from '../../utils/storage';
import { ROLE_LABELS } from '../../utils/sageConstants';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (user: Omit<User, 'id' | 'createdAt'>) => void;
  /** Roles the current viewer is allowed to assign */
  availableRoles: Array<User['role']>;
  /** Departments the current viewer is allowed to assign */
  availableDepartments: string[];
  /** When set, department is locked to this value (e.g. an Admin adding a user in their own department) */
  lockedDepartment?: string;
}

export const AddUserModal: React.FC<AddUserModalProps> = ({
  isOpen,
  onClose,
  onCreate,
  availableRoles,
  availableDepartments,
  lockedDepartment,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<User['role']>(availableRoles[0] || 'user');
  const [department, setDepartment] = useState(lockedDepartment || availableDepartments[0] || '');
  const [error, setError] = useState('');

  const reset = () => {
    setName('');
    setEmail('');
    setRole(availableRoles[0] || 'user');
    setDepartment(lockedDepartment || availableDepartments[0] || '');
    setError('');
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = () => {
    if (!name.trim() || !email.trim()) {
      setError('Please fill in name and email.');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    onCreate({
      name: name.trim(),
      email: email.trim(),
      role,
      department: lockedDepartment || department,
    });
    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add User"
      size="sm"
      actions={[
        { label: 'Cancel', variant: 'secondary', onClick: handleClose },
        { label: 'Add User', variant: 'primary', onClick: handleSubmit },
      ]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
        <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Jane Doe" />
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="jane.doe@motherson.com"
        />
        <Select
          label="Role"
          value={role}
          onChange={(e) => setRole(e.target.value as User['role'])}
          options={availableRoles.map((r) => ({ label: ROLE_LABELS[r], value: r }))}
        />
        <Select
          label="Department"
          value={lockedDepartment || department}
          onChange={(e) => setDepartment(e.target.value)}
          disabled={!!lockedDepartment}
          options={availableDepartments.map((d) => ({ label: d, value: d }))}
        />
        {error && (
          <div style={{ fontSize: typography.fontSize['body-xs'], color: colors['error-red'] }}>{error}</div>
        )}
      </div>
    </Modal>
  );
};

AddUserModal.displayName = 'AddUserModal';
