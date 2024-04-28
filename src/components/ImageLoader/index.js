import React, { useState, useEffect } from 'react';
import './styles.scss';
import Loader from '../Loader';

const ImageLoader = (props) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    return (
        <React.Fragment>
            {
                (!imageLoaded ) ?
                <>
                    <Loader />
                </>
            :
                <></>
            }
            <img
                {...props}  
                style={{ opacity: (imageLoaded ? '1' : '0'), ...props.style }}
                onLoad={handleImageLoad}
                className={props.className+' img-loader'}
            />
        </React.Fragment>
    );
};

export default ImageLoader;
