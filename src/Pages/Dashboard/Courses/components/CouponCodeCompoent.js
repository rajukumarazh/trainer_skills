import React, {useState, useEffect} from 'react'
import moment from 'moment';

import Checkbox from "../../../../components/InputGroup/Checkbox";
import TextArea from "../../../../components/InputGroup/TextArea";
import Input from "../../../../components/InputGroup/Input";
import Select from "../../../../components/InputGroup/Select";

function CouponCodeCompoent(props) {
      //console.log(props);

    let defaultCriteria = {
        partner_id: -1,
        instructor_id: -1,
        apply_to_skillstrainer: false
    };

    const [couponCode, setCouponCode] = useState({});

    //console.log('Props critiera object : ', criteria);

    useEffect(() => {
        setCouponCode(prevState => {
            const criteriaObj = {
                ...prevState,
                ...props.couponCode
            }
            return criteriaObj;
        });
    }, [props.couponCode])

    const updateValue = (e) => {
        const key = e.target.getAttribute('data-key');
                
        const value = e.target.value;
        const obj = {}
        obj[key] = value;
        
        setCouponCode(prevState => {
            const criteriaObj = {
                ...prevState,
                ...obj
            }
            return criteriaObj;
        });
    }

    const updateCheckbox = (e) => {

        const key = e.target.getAttribute('data-key');
                
        const value = e.target.checked;
        const obj = {}
        obj[key] = value;

        // criteria[key] = value;
        setCouponCode(prevState => {
            const criteriaObj = {
                ...prevState,
                ...obj
            }
            return criteriaObj;
        });
    }

    console.log('Available data : ', props.data);
    const resetCouponCode = () => {
        setCouponCode(prevState => {
          return {};
        });
        props.resetCouponCode()
    }

    console.log("Coupon Code Data : ", couponCode, props.couponCode);

    const getValue = (column_name, key_name) => {
      if (couponCode[column_name] && (key_name == 'text' || key_name == 'number')) {
        return couponCode[column_name]
      } else if (couponCode[column_name] && key_name == 'date') {
        return moment(couponCode[column_name]).format('YYYY-MM-DD')
      } else {
        return '';
      }
    }

    return (
        <div>
        {Object.keys(props.couponCodeFields).map((field_key) => {
          return (
            <div className="flex flex-wrap">
             
              {props.couponCodeFields[field_key].map((couponCodeColumn) => {
                  console.log('Column Name: ', 
                    couponCodeColumn.column_name,
                    couponCode[couponCodeColumn.column_name]
                    )
                  return (
                    <div className="w-1/2 p-1">
                      {["text", "date", "password", "number"].includes(couponCodeColumn.type) && (
                        <Input
                          
                          label={couponCodeColumn.label}
                          type={couponCodeColumn.type}
                          data-key={couponCodeColumn.column_name}
                          onChange={(e) => updateValue(e)}
                          value={getValue(couponCodeColumn.column_name, couponCodeColumn.type)}
                        />
                      )}
                      {couponCodeColumn.type == "text_area" && (
                        <TextArea
                          
                          label={couponCodeColumn.label}
                          data-key={couponCodeColumn.column_name}
                          onChange={(e) => updateValue(e)}
                          rows="5"
                          cols="30"
                          type="text"
                          value={couponCode[couponCodeColumn.column_name]}
                        />
                      )}
                      {couponCodeColumn.type == "checkbox" && (
                        <Checkbox
                          label={couponCodeColumn.label}
                          type="checkbox"
                          data-key={couponCodeColumn.column_name}
                          onChange={(e) => updateCheckbox(e)}
                          checked={couponCode[couponCodeColumn.column_name]}
                        />
                      )}
                      
                      {couponCodeColumn.type == "selector" && (
                        <Select
                          
                          label={couponCodeColumn.label}
                          options={
                            couponCodeColumn.column_name == "partner_id"
                              ? props.data?.courses_partner
                              : []
                          }
                          valueField={"id"}
                          displayField={ "name"}
                          data-key={couponCodeColumn.column_name}
                          onChange={(e) => updateValue(e)}
                          value={couponCode[couponCodeColumn.column_name]}
                        />
                      )}
                    </div>
                  );
              })}
            </div>

          )
        })}
            <button className="w-40 h-11 mt-3 border-r-4 bg-gray-700 text-base text-white mt-1" 
                onClick={() => props.saveCouponCode(couponCode)}
            >
                Save
            </button>
            <button className="w-40 h-11 mt-3 border-r-4 bg-green-700 text-base text-white mt-1" 
                onClick={() => resetCouponCode()}
            >
                Reset
            </button>
        </div>
    )
}

export default CouponCodeCompoent
