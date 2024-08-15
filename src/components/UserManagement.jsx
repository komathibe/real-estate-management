// import React, { useState, useEffect } from 'react';
// import mockApi from '../mockApi'; // Import mockApi
// import '../styles.css'; // Import specific styles for UserManagement

// const UserManagement = () => {
//   const [users, setUsers] = useState([]);
//   const [newUser, setNewUser] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phoneNumber: '',
//     password: '',
//     confirmPassword: '',
//     role: 'client',
//   });
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const userList = await mockApi.getUsers();
//         setUsers(userList);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNewUser({ ...newUser, [name]: value });
//     setError('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (newUser.password !== newUser.confirmPassword) {
//       setError('Passwords do not match!');
//       return;
//     }
//     setIsLoading(true);
//     try {
//       await mockApi.registerUser(newUser); // Register new user
//       const updatedUsers = await mockApi.getUsers(); // Refresh user list
//       setUsers(updatedUsers);
//       setNewUser({
//         firstName: '',
//         lastName: '',
//         email: '',
//         phoneNumber: '',
//         password: '',
//         confirmPassword: '',
//         role: 'client',
//       });
//       alert('User added successfully!');
//     } catch (error) {
//       setError('Error adding user!');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDelete = async (userId) => {
//     // Placeholder for delete functionality
//     alert(`Delete functionality not implemented for user ID: ${userId}`);
//   };

//   return (
//     <div className="user-management">
//       <h2>User Management</h2>
//       <br/> 
//       <form className="user-form" onSubmit={handleSubmit}>
//         <h3>Add New User</h3>
//         <br/>
//         <div className="input-group">
//           <label htmlFor="firstName">First Name:</label>
//           <input
//             type="text"
//             id="firstName"
//             name="firstName"
//             value={newUser.firstName}
//             onChange={handleChange}
//             placeholder="First Name"
//             required
//           />
//         </div>
//         <div className="input-group">
//           <label htmlFor="lastName">Last Name:</label>
//           <input
//             type="text"
//             id="lastName"
//             name="lastName"
//             value={newUser.lastName}
//             onChange={handleChange}
//             placeholder="Last Name"
//             required
//           />
//         </div>
//         <div className="input-group">
//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={newUser.email}
//             onChange={handleChange}
//             placeholder="Email"
//             required
//           />
//         </div>
//         <div className="input-group">
//           <label htmlFor="phoneNumber">Phone Number:</label>
//           <input
//             type="text"
//             id="phoneNumber"
//             name="phoneNumber"
//             value={newUser.phoneNumber}
//             onChange={handleChange}
//             placeholder="Phone Number"
//             required
//           />
//         </div>
//         <div className="input-group">
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={newUser.password}
//             onChange={handleChange}
//             placeholder="Password"
//             required
//           />
//         </div>
//         <div className="input-group">
//           <label htmlFor="confirmPassword">Confirm Password:</label>
//           <input
//             type="password"
//             id="confirmPassword"
//             name="confirmPassword"
//             value={newUser.confirmPassword}
//             onChange={handleChange}
//             placeholder="Confirm Password"
//             required
//           />
//         </div>
//         <fieldset>
//           <legend>Role:</legend>
//           <label>
//             <input
//               type="radio"
//               name="role"
//               value="client"
//               checked={newUser.role === 'client'}
//               onChange={handleChange}
//             />
//             Client
//           </label>
//           <label>
//             <input
//               type="radio"
//               name="role"
//               value="agent"
//               checked={newUser.role === 'agent'}
//               onChange={handleChange}
//             />
//             Agent
//           </label>
//         </fieldset>
//         {error && <p className="error-message">{error}</p>}
//         <button type="submit" disabled={isLoading}>
//           {isLoading ? 'Adding...' : 'Add User'}
//         </button>
//       </form>
//       <h3>Existing Users</h3>
//       <table className="user-table">
//         <thead>
//           <tr>
//             <th>First Name</th>
//             <th>Last Name</th>
//             <th>Email</th>
//             <th>Phone Number</th>
//             <th>Role</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.id}>
//               <td>{user.firstName}</td>
//               <td>{user.lastName}</td>
//               <td>{user.email}</td>
//               <td>{user.phoneNumber}</td>
//               <td>{user.role}</td>
//               <td>
//                 <button onClick={() => handleDelete(user.id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default UserManagement;
import React, { useState, useEffect } from 'react';
import mockApi from '../mockApi'; // Import mockApi
import '../styles.css'; // Import specific styles for UserManagement

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    role: 'client',
  });
  const [editingUser, setEditingUser] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userList = await mockApi.getUsers();
        setUsers(userList);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newUser.password !== newUser.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    setIsLoading(true);
    try {
      if (editingUser) {
        // Update existing user
        // Add your update logic here (e.g., mockApi.updateUser(newUser))
        alert('User updated successfully!');
      } else {
        await mockApi.registerUser(newUser); // Register new user
        alert('User added successfully!');
      }
      const updatedUsers = await mockApi.getUsers(); // Refresh user list
      setUsers(updatedUsers);
      resetForm();
    } catch (error) {
      setError('Error saving user!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setNewUser(user);
  };

  const handleDelete = async (userId) => {
    // Placeholder for delete functionality
    alert(`Delete functionality not implemented for user ID: ${userId}`);
  };

  const resetForm = () => {
    setNewUser({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      role: 'client',
    });
    setEditingUser(null);
    setError('');
  };

  return (
    <div className="user-management">
      <h2>User Management</h2>
      <form className="user-form" onSubmit={handleSubmit}>
        <h3>{editingUser ? 'Edit User' : 'Add New User'}</h3>
        <div className="input-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={newUser.firstName}
            onChange={handleChange}
            placeholder="First Name"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={newUser.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={newUser.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={newUser.phoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={newUser.password}
            onChange={handleChange}
            placeholder="Password"
            required={!editingUser} // Only required when adding new user
          />
        </div>
        <div className="input-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={newUser.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required={!editingUser} // Only required when adding new user
          />
        </div>
        <fieldset>
          <legend>Role:</legend>
          <label>
            <input
              type="radio"
              name="role"
              value="client"
              checked={newUser.role === 'client'}
              onChange={handleChange}
            />
            Client
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="agent"
              checked={newUser.role === 'agent'}
              onChange={handleChange}
            />
            Agent
          </label>
        </fieldset>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : editingUser ? 'Update User' : 'Add User'}
        </button>
        {editingUser && (
          <button type="button" onClick={resetForm} className="reset-button">
            Cancel
          </button>
        )}
      </form>
      <h3>Existing Users</h3>
      <table className="user-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user.id) }className="delBtn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
