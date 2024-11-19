'use client';

import React, { useEffect } from 'react';

import CustomModal from '@/components/custom-modal/custom-modal';
import DataTable from '@/components/data-table/dataTable';
import useCategoryStore from '@/service/category/category';

const Page = () => {
  const { categoriesData, getAllCategories } = useCategoryStore();

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      <CustomModal modalTitle={'Add New Category'} isCategoryModal={true} />
      <DataTable tableData={categoriesData} isCategory={true} />
    </>
  );
};

export default Page;
