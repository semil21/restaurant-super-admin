import React from 'react';

import useCategoryStore from '@/service/category/category';

type tableDataProps = {
  tableData?:
    | Array<{
        _id: string;
        name?: string;
        status: boolean;
      }>
    | [];

  isCategory?: boolean;
};

const DataTable = (props: tableDataProps) => {
  const { isCategory, tableData } = props;

  const { updateCategoryStatus, deleteCategory } = useCategoryStore();

  const handleCategoryStatus = async (cateogryId: string, status: boolean) => {
    await updateCategoryStatus(cateogryId, status);
  };

  const handleCategoryDelete = async (cateogryId: string) => {
    await deleteCategory(cateogryId);
  };

  return (
    <>
      {isCategory === true ? (
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                  <thead>
                    <tr className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-800	dark:even:bg-neutral-800 text-white">
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-[16px] font-medium text-white uppercase "
                      >
                        No
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-[16px] font-medium text-white uppercase "
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-[16px] font-medium text-white uppercase "
                      >
                        Status
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-end text-[16px] font-medium text-white uppercase  text-left	  "
                      >
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData?.map((val, index) => (
                      <tr className="" key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-[15px] font-medium text-black ">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-[15px]  font-medium text-black">
                          {val.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-[15px] font-medium text-black">
                          <td className="px-6 py-4 whitespace-nowrap text-[15px] font-medium text-black">
                            <button
                              type="button"
                              className={`focus:outline-none text-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 w-[7rem] ${
                                val?.status
                                  ? 'bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
                                  : 'bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800'
                              }`}
                              onClick={() =>
                                handleCategoryStatus(val?._id, val?.status)
                              }
                            >
                              {val?.status ? (
                                <span>Active</span>
                              ) : (
                                <span>Inactive</span>
                              )}
                            </button>
                          </td>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                            onClick={() => handleCategoryDelete(val?._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default DataTable;
