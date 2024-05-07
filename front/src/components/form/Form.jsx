// import { useEffect, useState } from "react";
// import InputMask from 'react-input-mask';
// import DatePicker from 'react-datepicker';
// import config from "../../params/config.js";
// import './style.css';
// import "react-datepicker/dist/react-datepicker.css";
// import { registerLocale } from  "react-datepicker";
// import { ru } from 'date-fns/locale/ru';
// import Editor from "react-simple-wysiwyg";
// registerLocale('ru-RU', ru)

// export default function Form({nameForm, arValue}) {
//     const [schema, setSchema] = useState(null);
//     const [formValue, setFormValue] = useState({});
//     const [url, setUrl] = useState(config.api + nameForm + '/');
//     const [edit, setEdit] = useState(false); 
//     const [disabled, setDisabled] = useState(true);
//     const [startDate, setStartDate] = useState(new Date());

//     const myStyles = {
//         itemShapes: ThinStar,
//         activeFillColor: '#ffb700',
//         inactiveFillColor: '#fbf1a9'
//       };

//     useEffect(
//         () => {
//             async function fetchSchema() {
//                 const response = await fetch(config.api + 'schema/get/' + nameForm + '/');
//                 const answer = await response.json();

//                 for(let key in answer) {
//                     let element = answer[key];

//                     if(element.type === 'DBRef') {
//                         let mdb = await fetch(config.api + element.collection + '/');
//                         let ar = await mdb.json();
//                         answer[key].arList = ar.data;
//                     }
//                 }
//                 setSchema(answer);
//             }
//             setUrl(config.api + nameForm + '/');
//             fetchSchema();
//             if(Object.keys(arValue).length > 0) {
//                 setFormValue(arValue);
//                 setEdit(true);
//                 setDisabled(false);
//             }
            
//         }, [nameForm, arValue]
//     );

//     function renderSelect(ar) {
//         let list = ar.arList;
//         let value = ar.value._id;

//         return (
//             <>
//                 <option key='0' value='0'>Выберите...</option>
//                 {
//                     list.map(item => (
//                         <option selected={value === item._id} key={item._id} value={item._id}>{item.TITLE}</option>
//                     ))
//                 }
//             </>
//         )
//     }

//     function renderForm(data = {}, ar = {}) {
//         let formElements = [];

//         for(let i in data) {
//             let newRow = data[i];

//             newRow.code = i;
//             newRow.value = (ar[i]) ? ar[i] : '';

//             switch(newRow.type) {
//                 case "String":
//                     newRow.fieldType = 'text';
//                     newRow.field = 'field';
//                 break;

//                 case "Number":
//                     newRow.fieldType = 'number';
//                     newRow.field = 'field';
//                 break;

//                 case "Email":
//                     newRow.fieldType = 'email';
//                     newRow.field = 'field';
//                 break;

//                 case 'Date':
//                     newRow.fieldType = 'date';
//                     newRow.field = 'date';
//                 break;

//                 case "Phone":
//                     newRow.fieldType = 'tel';
//                     newRow.field = 'tel';
//                 break;

//                 case "DBRef":
//                     newRow.fieldType = 'select';
//                     newRow.field = 'select';
//                     newRow.list = renderSelect(newRow);
//                 break;

//                 case "Hidden":
//                 default: 
//                     newRow.fieldType = 'hidden';
//                     newRow.field = 'hidden';
//                 break;
//             }

//             formElements.push(newRow);
//         }

//         return (
//             <>
//                 {
//                     formElements.map((item, index) => (
//                         <>
//                         { item.field === 'hidden' && <input type='hidden' name={item.code} defaultValue={item.value && item.value} />}  


//                         <label key={index}> 
//                             <span>{item.loc} {item.require && '*'}</span>
//                             {
//                                 item.field === 'field' && <input type={item.fieldType} 
//                                     required={item.require && true}
//                                     step={(item.fieldType === 'number') ? item.step : null} 
//                                     defaultValue={item.value && item.value}
//                                     readOnly={item.readOnly}
//                                     onChange={item.sim && callMethod}
//                                     name={item.code} />
//                             }

//                             {item.field === "text" && (
//                             <>
//                                 <Editor value={html} onChange={onChangeHTML} />
//                                 <textarea
//                                     name={item.code}
//                                     value={html}
//                                     className="hidden"
//                                     defaultValue={html}
//                                 ></textarea>
//                             </>
//                         )}

//                             {
//                                 item.field === 'select' && <select name={item.code}>{item.list}</select>
//                             }

//                             {
//                                 item.field === 'tel' && <InputMask
//                                 required={item.require && true}
//                                 defaultValue={item.value && item.value}
//                                 name={item.code}
//                                     mask="+7(999)-999-99-99" maskChar="_" />
//                             }

//                             {
//                                 item.field === 'date' && <DatePicker
//                                     selected={startDate}
//                                     dateFormat="dd.MM.yyyy"
//                                     name={item.code}
//                                     locale='ru-RU'
//                                     required={item.require && true}
//                                     defaultValue={item.value && item.value}
//                                     onChange={(date) => setStartDate(date)}
//                                 />
//                             }
//                         </label>
//                         </>
//                     ))
//                 }
//             </>
//         )
//     }

//     function callMethod(event) {
//         let form = event.target.closest('form'); //Форма
//         let name = event.target.name; //Имя поля провокатора является ключем схемы
//         let curSchemaTotal = schema[name].sim; //Имя поля с итогом

//         if(curSchemaTotal) {
//             let obTotal = form.querySelector('input[name='+curSchemaTotal+']'); //Поле с итогом
//             let value = 0;
//             let method = schema[curSchemaTotal].method; //Метод поля с итогом
//             let arSims = schema[curSchemaTotal].fields; //Ключи связных полей
//             let arFields = [];

//             arSims.forEach(item => {
//                 arFields.push(form.querySelector('input[name='+item+']'));
//             });

//             switch(method) {
//                 case "MULTIPLY":
//                     value = arFields[0].value * arFields[1].value;
//                 break;
//             }

//             obTotal.value = value;
//         }
//     }

//     function clearForm(event) {
//         event.preventDefault();
//         setFormValue({});
//         renderForm(schema, {});
//         setEdit(false);
//         setDisabled(true);
//     }

//     function checkRequired(event) {
//         let formElement = event.target.closest('form').querySelectorAll('input, select, textarea');
//         let error = 0;

//         formElement.forEach(item => {
//             if(item.required === true && (item.value === '0' || item.value === '')) {
//                 setDisabled(true);
//                 error++;
//             }
//         });

//         if(error == 0) 
//             setDisabled(false);
//     }

//     return (
//         <form className='editForm' method='POST' action={url} onChange={checkRequired}>
//             <input type='hidden' name='collection' value={nameForm}/>
//             { renderForm(schema, formValue) }

//             <button disabled={disabled && disabled}>
//                 {!edit && 'Сохранить'}
//                 {edit && 'Изменить'}
//             </button>
//             <button onClick={clearForm}>Сбросить</button>
//         </form>
//     )
// }



import { useState, useEffect } from "react";
import "./style.css";
import config from "../../params/config";

//Редактор текста
import Editor from "react-simple-wysiwyg";



//import MaterialInput from '@material-ui/core/Input';
import { registerLocale } from "react-datepicker";
import { ru } from "date-fns/locale/ru";
registerLocale("ru-RU", ru);

export default function Form({ nameForm, arValue = {} }) {
    //const shemaForm = schema[nameForm];
    const [schema, setSchema] = useState(null);
    const [formValue, setFormValue] = useState({});
    const [url, setUrl] = useState(config.api + "post/" + nameForm + "/");
    const [formName, setFormName] = useState(nameForm);
    const [edit, setEdit] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [startDate, setStartDate] = useState(new Date());
    const [html, setHtml] = useState("");
    const [rating, setRating] = useState(0);


    useEffect(() => {
        async function fetchSchema() {
            const response = await fetch(
                config.api + "get/schema/" + formName + "/"
            );
            const answer = await response.json();

            for (let key in answer) {
                let el = answer[key];

                if (el.type === "DBRef") {
                    let mdb = await fetch(
                        config.api + "get/" + el.collection + "/"
                    );
                    let ar = await mdb.json();
                    answer[key].arList = ar.data;
                }
            }

            setSchema(answer);
        }
        setFormName(nameForm);
        setUrl(config.api + "post/" + nameForm + "/");
        fetchSchema();
        if (Object.keys(arValue).length > 0) {
            setFormValue(arValue);
            setEdit(true);
            setDisabled(false);
        }
    }, [nameForm, arValue, formName]);

    function renderForm(data = {}, ar = {}, rand = 0) {
        let formElements = [];

        for (let i in data) {
            let newRow = data[i];

            newRow.code = i;
            newRow.value = ar[i] ? ar[i] : ""; //todo: Скорректировать под select

            switch (newRow.type) {
                case "String":
                case "Simbol":
                    newRow.fieldType = "text";
                    newRow.field = "field";
                    break;

                case "Number":
                    newRow.fieldType = "number";
                    newRow.field = "field";
                    break;

                case "Phone":
                    newRow.fieldType = "tel";
                    newRow.field = "tel";
                    break;

                case "Email":
                    newRow.fieldType = "email";
                    newRow.field = "field";
                    break;

                case "DBRef":
                    newRow.fieldType = "select";
                    newRow.field = "select";
                    newRow.list = renderSelect(newRow);
                    break;

                case "Date":
                    newRow.fieldType = "date";
                    newRow.field = "date";
                    break;

                case "Text":
                    newRow.fieldType = "text";
                    newRow.field = "text";
                    break;

                case "List":
                    newRow.fieldType = 'select';
                    newRow.field = 'simpleselect';
                    newRow.list = renderSimpleSelect(schema);
                break;

                case "File":
                    newRow.fieldType = "file";
                    newRow.field = "file";
                    break;

                    case "Rating":
                        newRow.fieldType = 'rating';
                        newRow.field = "rating";
                    break;

                case "Hidden":
                default:
                    newRow.fieldType = "hidden";
                    newRow.field = "field";
                    break;

                    
            }

            formElements.push(newRow);
        }

        return (
            <>
                {formElements.map((item, index) => (
                    <label key={index} htmlFor={item.code}>
                        <span>
                            {item.loc} {item.require && "*"}
                        </span>
                        {item.field === "field" && (
                            <input
                                type={item.fieldType}
                                required={item.require ? true : false}
                                defaultValue={item.value && item.value}
                                onChange={item.sim && callMethod}
                                onKeyUp={item.code === "TITLE" && nameSimbol}
                                readOnly={item.readOnly && true}
                                step={
                                    item.step > 0
                                        ? item.step
                                        : 'any'
                                }
                                name={item.code}
                            />
                        )}



                        {item.field === "text" && (
                            <>
                                <Editor value={html} onChange={onChangeHTML} />
                                <textarea
                                    name={item.code}
                                    value={html}
                                    className="hidden"
                                    defaultValue={html}
                                ></textarea>
                            </>
                        )}

                        {item.field === "file" && (
                            <input type="file" name={item.code} />
                        )}


                        {item.field === "select" && (
                            <select name={item.code}>{item.list}</select>
                        )}

                        {/* {
                            item.field === 'simpleselect' && (
                                <select name={item.code}>{item.list}</select>
                            )
                        } */}


                        
                    </label>
                ))}
            </>
        );
    }

    function renderSimpleSelect(schema) {
        console.log(schema);
        return [];
    }

     function nameSimbol(event) {
         let form = event.target.closest("form");
         let codeField = form.querySelector("input[name=CODE]");
         if(codeField)
             codeField.value = slugify(event.target.value, "_");
     }

    function callMethod(event) {
        let form = event.target.closest("form");
        let name = event.target.name;
        let obSchema = schema;
        let curSchemaSim = obSchema[name].sim;
        let total = form.querySelector("input[name=" + curSchemaSim + "]");
        let value = 0;

        if (curSchemaSim) {
            let method = obSchema[curSchemaSim].method;
            let arSimFields = obSchema[curSchemaSim].fields;
            let arFields = [];

            arSimFields.forEach((item) => {
                arFields.push(form.querySelector("input[name=" + item + "]"));
            });

            switch (method) {
                case "MULTIPLY":
                    value = arFields[0].value * arFields[1].value;
                    break;

                default:
                    break;
            }

            total.value = value;
        }
    }

    function renderSelect(ar) {
        let list = ar.arList;
        let value = ar.value._id;

        return (
            <>
                <option key="0" value="0">
                    Выберите...
                </option>
                {list.map((item) => (
                    <option
                        selected={value === item._id}
                        key={item._id}
                        value={item._id}
                    >
                        {item.TITLE}
                    </option>
                ))}
            </>
        );
    }

    function resetForm(event) {
        event.preventDefault();
        setFormValue({});
        renderForm(schema, {});
        setEdit(false);
        setDisabled(true);
    }

    function checkRequired(event) {
        let form = event.target.closest("form"); //Ищет ближайшего родителя по тегу, классу или идентификатору
        let formElements = form.querySelectorAll("input, select, textarea");
        let error = 0;

        formElements.forEach((item) => {
            if (
                item.required === true &&
                (item.value === "0" || item.value === "")
            ) {
                setDisabled(true);
                error++;
            }
        });

        if (error === 0) setDisabled(false);
    }

    function onChangeHTML(e) {
        setHtml(e.target.value);
    }

    return (
        <form
            method="POST"
            enctype="multipart/form-data"
            action={url}
            onChange={checkRequired}
            className={nameForm + " editForm"}
        >
            {renderForm(schema, formValue)}

            <div className="buttons">
                <button disabled={disabled && disabled}>
                    {!edit && "Сохранить"}
                    {edit && "Изменить"}
                </button>
                <button onClick={resetForm}>Сбросить</button>
            </div>
        </form>
    );
}