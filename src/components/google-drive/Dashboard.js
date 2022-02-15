import React from 'react';
import Navbar from './Navbar';
import {Container}from 'react-bootstrap'
import AddFolderButton from './AddFolderButton';
import useFolder from '../../Hooks/useFolder';
import Folder from './Folder';
import { useParams,useLocation } from 'react-router-dom';
import FolderBreadcrumbs from './FolderBreadcrumbs';
import AddFileButton from './AddFileButton';
import File from './File';


export default function Dashboard() {
    const { state ={}}=useLocation()
    const { folderId } = useParams();
    const { folder, childFolders,childFiles } = useFolder(folderId,state.folder)
    
    
    return <>
        <Navbar/>
        <Container fluid>
            <div className="d-flex align-items-center">
                <FolderBreadcrumbs currentFolder={ folder}/>
                <AddFolderButton currentFolder={folder} />
                <AddFileButton currentFolder={ folder}/>
            </div>
            {childFolders.length>0 &&(
                <div className="d-flex flex-wrap">
                    {childFolders.map(childFolder => (
                        <div className='p-2' key={childFolder.id} style={{ maxWidth: '250px' }}>
                            <Folder folder={childFolder}/>
                        </div>
                    ))}
                </div>
            )}
            {childFolders.length > 0 && childFiles.length > 0 && <hr/>}
            {childFiles.length>0 &&(
                <div className="d-flex flex-wrap">
                    {childFiles.map(childFiles => (
                        <div className='p-2' key={childFiles.id} style={{ maxWidth: '250px' }}>
                            <File file={childFiles}/>
                        </div>
                    ))}
                </div>
            )}
        </Container>
    </>
       
}
