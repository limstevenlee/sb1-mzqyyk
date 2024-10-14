import React, { useState } from 'react';
import { Car, Plus, Edit, Trash2 } from 'lucide-react';

interface Vehicle {
  id: number;
  plate: string;
  model: string;
  status: string;
}

const VehicleManagement: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    { id: 1, plate: '京A12345', model: '丰田凯美瑞', status: '可用' },
    { id: 2, plate: '京B67890', model: '本田雅阁', status: '维修中' },
    { id: 3, plate: '京C13579', model: '大众帕萨特', status: '已预约' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVehicle, setCurrentVehicle] = useState<Vehicle | null>(null);

  const openModal = (vehicle: Vehicle | null = null) => {
    setCurrentVehicle(vehicle);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentVehicle(null);
    setIsModalOpen(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const plate = (form.elements.namedItem('plate') as HTMLInputElement).value;
    const model = (form.elements.namedItem('model') as HTMLInputElement).value;
    const status = (form.elements.namedItem('status') as HTMLSelectElement).value;

    if (currentVehicle) {
      // Edit existing vehicle
      setVehicles(vehicles.map(v => 
        v.id === currentVehicle.id ? { ...v, plate, model, status } : v
      ));
    } else {
      // Add new vehicle
      const newVehicle = {
        id: Math.max(...vehicles.map(v => v.id), 0) + 1,
        plate,
        model,
        status,
      };
      setVehicles([...vehicles, newVehicle]);
    }
    closeModal();
  };

  const handleDelete = (id: number) => {
    if (window.confirm('确定要删除这辆车吗？')) {
      setVehicles(vehicles.filter(v => v.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">车辆管理系统</h1>
          <div className="mb-4">
            <button
              onClick={() => openModal()}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus className="h-5 w-5 mr-2" />
              添加新车辆
            </button>
          </div>
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {vehicles.map((vehicle) => (
                <li key={vehicle.id}>
                  <div className="block hover:bg-gray-50">
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Car className="h-5 w-5 text-gray-400 mr-3" />
                          <p className="text-sm font-medium text-indigo-600 truncate">{vehicle.plate}</p>
                        </div>
                        <div className="ml-2 flex-shrink-0 flex">
                          <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {vehicle.status}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">
                            {vehicle.model}
                          </p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <button
                            onClick={() => openModal(vehicle)}
                            className="text-indigo-600 hover:text-indigo-900 mr-2"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(vehicle.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="mb-4">
                    <label htmlFor="plate" className="block text-sm font-medium text-gray-700">车牌号</label>
                    <input
                      type="text"
                      name="plate"
                      id="plate"
                      required
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      defaultValue={currentVehicle?.plate}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="model" className="block text-sm font-medium text-gray-700">车型</label>
                    <input
                      type="text"
                      name="model"
                      id="model"
                      required
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      defaultValue={currentVehicle?.model}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">状态</label>
                    <select
                      name="status"
                      id="status"
                      required
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      defaultValue={currentVehicle?.status}
                    >
                      <option value="可用">可用</option>
                      <option value="维修中">维修中</option>
                      <option value="已预约">已预约</option>
                    </select>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    {currentVehicle ? '更新' : '添加'}
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    取消
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleManagement;