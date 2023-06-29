import React from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-bootstrap/Carousel';

import { srcImages } from '../utils';

const ImageCarousel = ({ prop }) => {
    return (
        <Carousel style={{ backgroundColor: `rgba(0,0,0,.03)` }}>
            {prop.images.map((image, i) => {
                const item = srcImages.files.find(srcImg => srcImg.indexOf(image.url) >= 0);
                return <Carousel.Item key={`car${i}`}>
                    <img src={item} alt={image.label} />
                    <Carousel.Caption
                        style={{
                            position: `relative`,
                            right: `0`,
                            left: `0`,
                            paddingTop: `0`,
                        }}
                    >
                        <h6>
                            <div style={{
                                color: 'white',
                                backgroundColor: '#6c757d',
                                display: 'inline',
                                paddingLeft: '12px',
                                paddingRight: '12px',
                                paddingBottom: '20px',
                                opacity: '0.65',
                            }}>
                                {image.label}
                            </div>
                        </h6>
                    </Carousel.Caption>
                </Carousel.Item>
            })}
        </Carousel>
    )
}
ImageCarousel.propTypes = {
    prop: PropTypes.object.isRequired,
}

export default ImageCarousel;
