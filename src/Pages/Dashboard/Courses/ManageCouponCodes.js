import React, {useState} from 'react'
import {useQuery, useMutation} from '@apollo/client'

import CouponCodeCompoent from './components/CouponCodeCompoent'
import CouponCodesTable from './components/CouponCodesTable'
import {couponCodeFields} from './DbScchemas'

import {GET_PARTNERS} from '../../../GraphQl/Queries/Partner'
import {GET_ALL_COUPONS, CREATE_NEW_COUPON_CODES, UPDATE_NEW_COUPON_COES} from '../../../GraphQl/Queries/CourseCoupons';
import {GET_TOTAL_COUPON_CODES} from '../../../GraphQl/Queries/CourseCoupons'

function ManageCouponCodes() {

    const {error, loading, data} = useQuery(GET_PARTNERS);
    const allCoupons= useQuery(GET_ALL_COUPONS);

    const [insertCoupon, insertCouponUpdate] = useMutation(CREATE_NEW_COUPON_CODES, {
        refetchQueries: [GET_ALL_COUPONS],
      });
    
    const totalCouponCodes = useQuery(GET_TOTAL_COUPON_CODES);
    
    const [updateCoupon, updateCopuonUpdates ] = 
        useMutation(UPDATE_NEW_COUPON_COES, {
            refetchQueries: [GET_ALL_COUPONS, GET_TOTAL_COUPON_CODES],
        });
  

    
    const [couponcode, setCouponCode] = useState({});
    
    const saveCouponCode = (couponCode) => {

        if (!couponCode.id) {
            insertCoupon({
                variables: {
                    object: couponCode
                }
            })
        } else {
            console.log('Updating coupon');
            delete couponCode["num_of_users"]
            updateCoupon({
                variables: {
                    id: {_eq: couponCode.id},
                    _set: couponCode
                }
            })
        }
    }

    const updateCourseCouponCode = (selectedCouponCode) => {

        setCouponCode(prevState => {
            const courseObj = {
              ...prevState,
              ...selectedCouponCode
            }
      
            return courseObj;
        });

    }

    const resetCouponCode = () => {
        setCouponCode(prevState => {
            return {};
        });
    }
    
    return (
        <div>
            <h2 className="text-2xt font-bold px-4">
                    Manage Coupon Codes
            </h2>
            <div className="px-4 m-3 w-3/4">
                <div className="m-3">
                    <h5>Create coupon codes</h5>
                    <CouponCodeCompoent 
                        saveCouponCode={(couponCode) => saveCouponCode(couponCode)} 
                        couponCodeFields={couponCodeFields}
                        couponCode = {couponcode}
                        data = {data}
                        resetCouponCode={() => resetCouponCode()}
                    />
                   
                </div>
                {insertCouponUpdate.data?.insert_courses_st_coupons_configuration_one && 
                    <div className="text-green-600 text-base mt-2">
                        Course critiera created
                    </div>
                }
                {updateCopuonUpdates.data?.update_courses_st_coupons_configuration && 
                    <div className="text-green-600 text-base mt-2">
                        Course critiera updated
                    </div>
                }
               
            </div>
            <CouponCodesTable 
                allCoupons={allCoupons}
                totalCouponCodes={totalCouponCodes}
                updateCourseCouponCode=
                    {(couponPayload) => 
                        updateCourseCouponCode(couponPayload)}
            />
        </div>
    )
}

export default ManageCouponCodes
