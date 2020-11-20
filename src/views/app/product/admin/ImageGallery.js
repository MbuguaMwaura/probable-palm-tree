import React from 'react';
import  Gallery from 'react-photo-gallery'
import {mapImageDataToLibraryFormat} from "../../../../helpers/DataManagement";

const ImageGallery = (props) => {
    const images = mapImageDataToLibraryFormat(props.images)
    return (
        <Gallery photos={images}/>
    );
}

export default ImageGallery