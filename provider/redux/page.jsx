'use client';
import { CloudIcon } from '@/utils/utils';
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { useDispatch } from 'react-redux';

const AddProduct = () => {
  const user = useSelector((state) => state.user.user);
  const activeVendor = useSelector((state) => state.user.activeVendor);
  const product = useSelector((state) => state.modal.products);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const [formValues, setFormValues] = useState({
    productName: '',
    description: '',
    basePrice: 0,
    discountPercentage: 0,
    discountType: '',
    vatAmount: 0,
    productImages: [],
    discountStartDate: '',
    discountEndDate: '',
  });

  useEffect(() => {
    if (product && Object.keys(product)?.length > 0) {
      setFormValues({
        productName: product?.name || '',
        description: product?.description || '',
        basePrice: parseFloat(product?.basePrice) || 0,
        discountPercentage:
          parseFloat(product?.discount?.[0]?.discountAmount) || 0,
        discountType: product?.discount?.[0]?.discountType || '',
        vatAmount: parseFloat(product?.vatAmount) || 0,
        productImages: product?.images || [],
        discountStartDate: product?.discount?.[0]?.startDate || '',
        discountEndDate: product?.discount?.[0]?.endDate || '',
      });
    } else {
      // Reset product state to empty object
      setFormValues({
        productName: '',
        description: '',
        basePrice: 0,
        discountPercentage: 0,
        discountType: '',
        vatAmount: 0,
        productImages: [],
        discountStartDate: '',
        discountEndDate: '',
      });
    }
  }, [product]);

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const validateForm = () => {
      const { productName, description, basePrice, vatAmount } = formValues;
      setIsFormValid(
        productName.trim() !== '' &&
          description.trim() !== '' &&
          basePrice !== 0 &&
          vatAmount !== 0
      );
    };
    validateForm();
  }, [formValues]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormValues((prevValues) => ({
      ...prevValues,
      productImages: [...prevValues.productImages, ...files],
    }));
  };

  const removeImage = async (index, image) => {
    if (product && Object.keys(product)?.length > 0) {
      setLoading(true);
      try {
        const response = await axios.delete(
          `${process.env.BASEURL}/product/image`,
          {
            data: {
              imagesId: [image.id], // Adjust this based on your image object structure
              productId: product.id,
              vendorId: activeVendor,
            },
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        console.log('Delete response:', response.data);

        // Optionally update vendors or handle the response as needed
        // setVendors(response.data.user.vendor);

        toast.success('Image deleted successfully');
      } catch (error) {
        console.error('Error deleting image:', error);
        const errorMessage =
          error?.response?.data?.message ||
          error?.response?.data?.errors ||
          error?.message ||
          'Unknown error';
        toast.error(`Failed to delete image: ${errorMessage}`);
        if (error?.response?.data?.statusCode === 401) {
          // Handle unauthorized error (e.g., redirect to login)
          router.push('/auth/login');
        }
      } finally {
        setLoading(false);
      }
    }

    setFormValues((prevValues) => {
      const newImages = prevValues.productImages.filter((_, i) => i !== index);
      return { ...prevValues, productImages: newImages };
    });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log('test typeof', typeof formValues.basePrice);
    const formData = new FormData();
    formData.append('name', formValues.productName);
    formData.append('description', formValues.description);
    formData.append('basePrice', parseFloat(formValues.basePrice));
    formData.append(
      'discountAmount',
      parseFloat(formValues.discountPercentage)
    );
    formData.append('discountType', formValues.discountType);
    formData.append('vatAmount', parseFloat(formValues.vatAmount));
    formData.append('vendorId', activeVendor);
    formValues.productImages.forEach((file) => {
      formData.append('productImages', file);
    });
    formData.append('discountStartDate', formValues.discountStartDate);
    formData.append('discountEndDate', formValues.discountEndDate);
    if (product && Object.keys(product).length > 0) {
      formData.append('productId', product.id);
    }
    // Log the values and their types in the FormData object
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value} (type: ${typeof value})`);
    }

    try {
      const method =
        product && Object.keys(product).length > 0 ? 'put' : 'post';

      const response = await axios[method](
        `${process.env.BASEURL}/product`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Success:', response.data);
      if (response?.data?.message === 'operation successful') {
        toast.success(
          `Product ${
            product && Object.keys(product).length > 0 ? 'updated' : 'created'
          } successfully`
        );
      }
      setFormValues({
        productName: '',
        description: '',
        basePrice: 0,
        discountPercentage: 0,
        discountType: '',
        vatAmount: 0,
        productImages: [],
        discountStartDate: '',
        discountEndDate: '',
      });
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.errors ||
        error?.message ||
        'Unknown error';
      toast.error(`${errorMessage}`);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="pt-[50px]">
      <div className="flex justify-between mb-4">
        <div>
          <p className="text-[24px] font-bold">
            {product && Object.keys(product).length > 0 ? 'Edit' : 'Add'}{' '}
            Product
          </p>
          <p className="text-[#667185] text-sm">
            {product && Object.keys(product).length > 0
              ? 'Edit product details'
              : 'Add product to show on customers interface'}
          </p>
        </div>
        <button className="border border-[#FFFFFF] px-4 py-2">Cancel</button>
      </div>
      <div className="bg-white border-[#F0F2F5] py-[24px] px-[32px] mb-4">
        <p className="text-[#000B33] italic font-semibold text-lg">
          General Information
        </p>
        <div className="mb-4">
          <label
            htmlFor="productName"
            className="block mb-2 text-sm font-medium text-[#475367]"
          >
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            placeholder="Type product name here. . ."
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
            value={formValues.productName}
            onChange={(e) =>
              setFormValues({ ...formValues, productName: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-[#475367]"
          >
            Description
          </label>
          <textarea
            id="description"
            rows="4"
            className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Type product description here. . ."
            value={formValues.description}
            onChange={(e) =>
              setFormValues({ ...formValues, description: e.target.value })
            }
          ></textarea>
        </div>
      </div>
      <div className="bg-white border-[#F0F2F5] py-[24px] px-[32px] mb-4">
        <p className="text-veriDark italic font-semibold text-lg">
          General Information
        </p>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="basePrice"
              className="block mb-2 text-sm font-medium text-[#475367]"
            >
              Base Price
            </label>
            <input
              type="number"
              min={1}
              id="basePrice"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              placeholder="$ Type base price here. . ."
              value={formValues.basePrice}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  basePrice: parseFloat(e.target.value),
                })
              }
              required
            />
          </div>
          <div>
            <label
              htmlFor="discountPercentage"
              className="block mb-2 text-sm font-medium text-[#475367]"
            >
              Discount Percentage (%)
            </label>
            <input
              type="number"
              id="discountPercentage"
              min={0}
              max={100}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              placeholder="Type discount percentage. . ."
              value={formValues.discountPercentage}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  discountPercentage: parseFloat(e.target.value),
                })
              }
            />
          </div>
          <div>
            <label
              htmlFor="discountType"
              className="block mb-2 text-sm font-medium text-[#475367]"
            >
              Discount Type
            </label>
            <input
              type="text"
              id="discountType"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              placeholder="Enter Discount Type. . ."
              value={formValues.discountType}
              onChange={(e) =>
                setFormValues({ ...formValues, discountType: e.target.value })
              }
            />
          </div>
          <div>
            <label
              htmlFor="vatAmount"
              className="block mb-2 text-sm font-medium text-[#475367]"
            >
              VAT Amount (%)
            </label>
            <input
              type="number"
              min={0}
              id="vatAmount"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              placeholder="Enter VAT Amount. . ."
              value={formValues.vatAmount}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  vatAmount: parseFloat(e.target.value),
                })
              }
              required
            />
          </div>
          <div>
            <label
              htmlFor="vatAmount"
              className="block mb-2 text-sm font-medium text-[#475367]"
            >
              Discount Start Date
            </label>
            <input
              type="date"
              id="discountStartDate"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              placeholder=""
              value={formValues.discountStartDate}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  discountStartDate: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label
              htmlFor="discountEndDate"
              className="block mb-2 text-sm font-medium text-[#475367]"
            >
              Discount End Date
            </label>
            <input
              type="date"
              id="discountEndDate"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              placeholder="Enter VAT Amount. . ."
              value={formValues.discountEndDate}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  discountEndDate: e.target.value,
                })
              }
              required
            />
          </div>
        </div>
      </div>
      <div className="bg-white border-[#F0F2F5] py-[24px] px-[32px] mb-4">
        <p className="text-veriDark italic font-semibold text-lg">Media</p>
        <div className="mb-4">
          <label
            htmlFor="images"
            className="block mb-2 text-sm font-medium text-[#475367]"
          >
            Photo
          </label>
          <div className="border border-dotted min-h-[150px] p-6 rounded-[16px] border-veriGreen flex justify-center items-center">
            <div className="text-center w-10/12 mx-auto">
              <div className="flex items-center justify-center mb-4">
                <div className="w-[56px] h-[56px] bg-gray-200 rounded-full flex items-center justify-center">
                  <CloudIcon />
                </div>
              </div>
              <div className="flex justify-center">
                <div className="flex gap-2">
                  <p
                    className="font-semibold text-sm text-veriGreen"
                    role="button"
                  >
                    Click to upload
                  </p>
                  <p className="text-[#475367] font-normal">or drag and drop</p>
                </div>
              </div>
              <p className="text-[#98A2B3]">
                SVG, PNG, JPG or GIF (max. 800x400px)
              </p>
              <div className="flex items-center gap-3">
                <div className="w-full border-b" />
                <p className="text-[#101928]">OR</p>
                <div className="w-full border-b" />
              </div>
              <input
                type="file"
                id="images"
                multiple
                ref={fileInputRef}
                className="hidden mt-4"
                onChange={handleImageChange}
              />
              <div className="flex items-center justify-center mt-5">
                <button
                  className="bg-veriGreen text-white py-2 px-4 rounded-[6px]"
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                >
                  Add Image
                </button>
              </div>
            </div>
          </div>
          {formValues.productImages.length > 0 && (
            <div className="mt-4">
              <p className="text-[#475367] font-medium">Uploaded Images:</p>
              <div className="flex flex-wrap gap-4 mt-2">
                {formValues.productImages.map((image, index) => (
                  <div key={index} className="relative">
                    <Image
                      height={24}
                      width={24}
                      src={image?.assetUrl || URL?.createObjectURL(image)}
                      alt={`uploaded ${index}`}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-0 w-[20px] h-[20px] text-base italic flex justify-center items-center bg-red-500 text-white rounded-full p-1"
                      onClick={() => removeImage(index, image)}
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 px-[32px]">
        <div></div>
        <div>
          <div className="flex gap-3 my-3">
            <button className="py-[8px] px-[22px] border border-[#D0D5DD] text-veriGreen w-full">
              Cancel
            </button>
            <button
              disabled={!isFormValid || loading}
              className={`border px-4 py-2 w-full flex justify-center items-center ${
                isFormValid
                  ? 'bg-veriGreen text-white'
                  : 'bg-gray-300 text-gray-700 cursor-not-allowed'
              }`}
              type="submit"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>{' '}
                  <span className="">Loading</span>
                </>
              ) : product && Object.keys(product).length > 0 ? (
                'Update Product'
              ) : (
                'Submit'
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddProduct;
