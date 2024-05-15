import { useRef } from "react";
import Input from "./Input";
import Modal from "./Modal";

export default function NewProjectForm({saveProject, onCancel}){
    const modal = useRef();
    const title = useRef();
    const description = useRef();
    const dueDate = useRef();

    function handleSave(){
        if(!validateForm()) return;
        const project = {
            title: title.current.value,
            description: description.current.value,
            dueDate: dueDate.current.value,
            tasks: []
        }
        saveProject(project);
        onCancel();
    }

    function handleCancel(){
        onCancel();
    }

    function validateForm(){
        if(title.current.value.trim() == '' || description.current.value.trim() == '' || dueDate.current.value.trim() == '')
        {
            modal.current.open();
            return false;
        }
        return true;
    }

    return (
        <>
            <Modal ref={modal} buttonCaption="Okay">
                <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
                <p className="text-stone-600 mb-4">Oops ... looks like you forgot to enter a value.</p>
                <p className="text-stone-600 mb-4">Please make sure you provide a valid value for every input field.</p>
            </Modal>
            <div className="w-[35rem] mt-16">
                <menu className="flex items-center justify-end gap-4 my-4">
                    <li><button onClick={handleCancel} className="text-stone-800 hover:text-stone-950">Cancel</button></li>
                    <li><button onClick={handleSave} className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950">Save</button></li>
                </menu>
                <div>
                <Input ref={title} label="Title" type="text"/>
                <Input ref={description} label="Description" isTextArea/>
                <Input ref={dueDate} label="Due Date" type="date"/>
                </div>
            </div>
        </>
    );
}