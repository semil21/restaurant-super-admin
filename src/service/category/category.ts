import categoryProps from '@/types/category';
import axios from 'axios';
import { toast } from 'react-toastify';
import { create } from 'zustand';

interface CategoryStore {
  categoriesData: categoryProps[];
  getAllCategories: () => void;
  updateCategoryStatus: (cateogryId: string, status: boolean) => Promise<void>;
  deleteCategory: (cateogryId: string) => Promise<void>;
}

const useCategoryStore = create<CategoryStore>((set) => ({
  categoriesData: [],

  addNewCategory: async (props: categoryProps) => {
    try {
      const saveNewCategory = await axios.post(
        'http://localhost:3500/category/create',
        props,
      );
      if (saveNewCategory.status === 200) {
        set((state) => ({
          categoriesData: [
            ...state.categoriesData,
            saveNewCategory.data.response,
          ],
        }));

        toast.success('Category added successfully', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      toast.error(`${error?.response?.data?.response}`, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  },

  getAllCategories: async () => {
    try {
      const getCategoriesData = await axios.get(
        'http://localhost:3500/category',
      );

      if (getCategoriesData.status === 200) {
        set({ categoriesData: getCategoriesData.data.response });
      }
    } catch (error) {
      toast.error(`${error?.response?.data?.response}`, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  },

  updateCategoryStatus: async (cateogryId: string, status: boolean) => {
    try {
      const updateRecordStatus = await axios.put(
        `http://localhost:3500/category/update-status/${cateogryId}`,
        { status },
      );

      if (updateRecordStatus.status === 200) {
        set((state) => ({
          categoriesData: state.categoriesData.map((item) =>
            item._id === cateogryId
              ? { ...item, status: updateRecordStatus.data.response.status }
              : item,
          ),
        }));
      }
    } catch (error) {
      console.log('Failed to update category status');
    }
  },

  deleteCategory: async (categoryId: string) => {
    try {
      const deleteRecord = await axios.delete(
        `http://localhost:3500/category/${categoryId}`,
      );

      if (deleteRecord.status === 200) {
        set((state) => ({
          categoriesData: state.categoriesData.filter(
            (item) => item._id !== categoryId,
          ),
        }));
      }
    } catch (error) {
      console.log('Failed to delete a category');
    }
  },
}));

export default useCategoryStore;
