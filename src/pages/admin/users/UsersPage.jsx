import React, { useState, useEffect } from 'react';
import { Search, User, Mail, Shield, Calendar } from 'lucide-react';
import apiService from '../../../services/api';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await apiService.getUsers();
        const userArray = Array.isArray(usersData) ? usersData : (usersData?.data || []);
        setUsers(userArray);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadge = (role) => {
    const roleConfig = {
      admin: { text: 'Admin', class: 'bg-purple-100 text-purple-800' },
      manager: { text: 'Manager', class: 'bg-blue-100 text-blue-800' },
      user: { text: 'User', class: 'bg-gray-100 text-gray-800' }
    };
    
    const config = roleConfig[role] || roleConfig.user;
    return (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${config.class}`}>
        {config.text}
      </span>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">
              Users ({filteredUsers.length})
            </h2>
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          {filteredUsers.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <User className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No users found</p>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => {
                  const uid = user._id || user.id;
                  return (
                    <tr key={uid} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mr-3">
                            <User className="w-4 h-4 text-white" />
                          </div>
                          <div className="text-sm font-medium text-gray-900">
                            {user.name || 'Unknown User'}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900">
                          <Mail className="w-4 h-4 text-gray-400 mr-2" />
                          {user.email || '—'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Shield className="w-4 h-4 text-gray-400 mr-2" />
                          {getRoleBadge(user.role)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900">
                          <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                          {formatDate(user.createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.isActive !== false ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {user.isActive !== false ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
