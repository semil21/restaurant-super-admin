'use client';

import React, { useState } from 'react';

import useCategoryStore from '@/service/category/category';
import { useForm } from 'react-hook-form';

type modalProps = {
  modalTitle?: string;
  isCategoryModal?: boolean;
  isDishModal?: boolean;
};

const CustomModal = (props: modalProps) => {
  const [showModal, setShowModal] = useState(false);

  const { modalTitle, isCategoryModal, isDishModal } = props;

  const { addNewCategory } = useCategoryStore();
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm();

  const addNewData = async (data) => {
    if (isCategoryModal === true) {
      await addNewCategory(data).then(() => reset());
    }
  };

  return (
    <>
      <div className="flex justify-center ">
        <button
          className="bg-gray-900 text-white  font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 w-[25rem] flex items-center justify-center"
          type="button"
          onClick={() => setShowModal(true)}
        >
          {modalTitle && modalTitle}
        </button>
      </div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none w-[700px]">
                <div className="flex items-center justify-center p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold mt-6">
                    {modalTitle && modalTitle}
                  </h3>
                  <button
                    className="absolute top-3 right-3 p-1 bg-transparent border-0 text-black opacity-50 text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-50 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>

                {isCategoryModal == true ? (
                  <div className="w-full flex justify-center items-center">
                    <form
                      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                      onSubmit={handleSubmit(addNewData)}
                    >
                      <div className="mb-4">
                        <label className="block text-gray-700 text-[15px] font-bold mb-2">
                          Category Name
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="username"
                          type="text"
                          placeholder="Enter Category name"
                          {...register('name')}
                        />
                      </div>
                    </form>
                  </div>
                ) : null}

                {isDishModal === true ? (
                  <div className="relative p-6 flex-auto">
                    <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Sint natus praesentium vel quas blanditiis voluptate
                      quaerat saepe iusto, quibusdam id eos, asperiores facilis
                      ea officia delectus non dolor, iure nihil suscipit
                      architecto at quos unde. Temporibus reiciendis minus
                      deserunt autem.
                    </p>
                  </div>
                ) : null}

                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      handleSubmit(addNewData)(), setShowModal(false);
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default CustomModal;
