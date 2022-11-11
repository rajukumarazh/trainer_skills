import React, {useState, useEffect} from 'react'
import Select from 'react-select'

function CriteriaComponent(props) {
    //console.log(props);

    let defaultCriteria = {
        partner_id: -1,
        instructor_id: -1,
        apply_to_skillstrainer: false
    };

    const [criteria, setcriteria] = useState(defaultCriteria)

    //console.log('Props critiera object : ', criteria);

    useEffect(() => {
        setcriteria(prevState => {
            const criteriaObj = {
                ...prevState,
                ...props.criteria
            }
            return criteriaObj;
        });
    }, [props.criteria])

    const updateValue = (e) => {
        const key = e.target.getAttribute('data-key');
                
        const value = e.target.value;
        const obj = {}
        obj[key] = value;
        
        setcriteria(prevState => {
            const criteriaObj = {
                ...prevState,
                ...obj
            }
            return criteriaObj;
        });
    }

    const updateSelectValue = (value, key) => {
                
        const obj = {}
        obj[key] = value;
        
        setcriteria(prevState => {
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
        setcriteria(prevState => {
            const criteriaObj = {
                ...prevState,
                ...obj
            }
            return criteriaObj;
        });
    }

    const getCritieraValue = (value) => {
       return value ? value : -1;
    }

    const getOptions = (column_name) => {
        if(column_name == "partner_id"){
            return props.data?.courses_partner.map((partner) => {
                return {
                    label: partner.name,
                    value: partner.id
                }
        })}
        if(column_name == "instructor_id"){ 
            return props.data?.courses_instructor.map((insructor) => {
                return {
                    label: insructor.name,
                    value: insructor.id
                }
        })}
        if(column_name == "coupon_id") {
            return props.data?.courses_st_coupons_configuration.map((coupon) => {
                return {
                    label: coupon.code,
                    value: coupon.id
                }
        })}
    }

    const getSelectedValue = (defaultValue, column_name) => {
        if(column_name == "partner_id"){
            return props.data?.courses_partner.map((partner) => {
                return {
                    label: partner.name,
                    value: partner.id
                }
        }).filter(({value}) => value == defaultValue )[0]}
        if(column_name == "instructor_id"){ 
            return props.data?.courses_instructor.map((insructor) => {
                return {
                    label: insructor.name,
                    value: insructor.id
                }
        }).filter(({value}) => value == defaultValue )[0]}
        if(column_name == "coupon_id") {
            return props.data?.courses_st_coupons_configuration.map((coupon) => {
                return {
                    label: coupon.code,
                    value: coupon.id
                }
        }).filter(({value}) => value == defaultValue )[0]}
    }

    return (
        <div>
            {props.criteriaFields.map(({column_name, label, type}) => {
                return (
                    <div className="flex mt-2 mb-2">
                        <div className="flex-1">
                            {label}
                        </div>
                        <div className="flex-1">
                            {type == "select" && <Select
                                options={getOptions(column_name)}
                                value={getSelectedValue(criteria[column_name], column_name)}
                                onChange={(e) => updateSelectValue( e.value, column_name)}
                            />
                            }
                            {/* {type == "select" && <select
                                data-key={column_name}
                                value={criteria[column_name]}
                                onChange={(e) => updateValue(e)}
                                
                            >
                                    <option 
                                        value="-1"
                                        >Choose
                                    </option>
                                    {column_name == "partner_id" && props.data?.courses_partner.map((partner) => {
                                            return (
                                                <option value={partner.id}>{partner.name}</option>
                                            )
                                        })}
                                    {column_name == "instructor_id" && props.data?.courses_instructor.map((insructor) => {
                                        return (
                                            <option value={insructor.id}>{insructor.name}</option>
                                        )
                                    })}
                                    {column_name == "coupon_id" && props.data?.courses_st_coupons_configuration.map((coupon) => {
                                        return (
                                            <option value={coupon.id}>{coupon.code}</option>
                                        )
                                    })}
                                </select>} */}
                            {type == "checkbox" && <input 
                                data-key={column_name}
                                onChange={(e) => updateCheckbox(e)}
                                type="checkbox"
                                checked={criteria[column_name]}
                                />}
                        </div>
                    </div>
                )
            })}
            <button className="block w-40 h-11 mt-3 border-r-4 bg-gray-700 text-base text-white mt-1" 
                onClick={() => props.saveCriteria(criteria)}
            >
                Update
            </button>
        </div>
    )
}

export default CriteriaComponent
