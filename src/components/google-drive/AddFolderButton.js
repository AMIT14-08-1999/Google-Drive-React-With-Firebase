import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { database } from '../../firebase';
import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import {useAuth} from '../../contexts/AuthContext'
import { ROOT_FOLDER } from '../../Hooks/useFolder'


export default function AddFolderButton({currentFolder}) {
    const [open, setOpen] = useState(false)
    const [name, setName] = useState("")
    const { currentUser } = useAuth();
    function openModal() {
        setOpen(true)
     }

    function closeModel() {
        setOpen(false)
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (currentFolder === null) return 
        
        const path = [...currentFolder.path]
        if (currentFolder !== ROOT_FOLDER) {
            path.push({
                name: currentFolder.name,
                id: currentFolder.id
            });
        }
            
        database.folders.add({
            name: name,
            parentId:currentFolder.id,
            userId: currentUser.uid,
            path:path,
            createdAt:database.getCurrentTimeStamp()
        })
        setName("")
        closeModel()
    }
    return (
        <>
            <Button onClick={openModal} variant="outline-success" size='sm'>
                <FontAwesomeIcon icon={faFolderPlus}/>
            </Button>
            <Modal show={open} onHide={closeModel}>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Folder Name</Form.Label>
                            <Form.Control
                                type='text'
                                required
                                value={name}
                               onChange={e=>setName(e.target.value)} 
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={closeModel}>Close</Button>
                        <Button variant='success' type="submit">Add Folder</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
  );
}
