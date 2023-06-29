import React from 'react';
import PropTypes from 'prop-types';

import Card from "react-bootstrap/Card";
import SourceReplacer from '../components/source-replacer';
import ImageCarousel from './../components/image-carousel';

import { buildSource } from '../utils';

const HelpCard = ({ data }) => {
    return (
        <Card bg="dark" text="light">
            <Card.Body>
                <ul>
                    {data?.properties
                        .filter(p => 
                            !(p.type === "select" 
                            && (!!p.hideIfSingleOption && p.hideIfSingleOption && p.options?.length === 1))
                        ).map((prop, index) => {
                        if (!!prop.images && prop.images.length) {
                            return (
                                <div key={`help${prop.name}${index}`} style={{ marginBottom: `0` }}>
                                    <ImageCarousel prop={prop} />
                                </div>
                            );
                        }
                        if (!!prop.itemProperties && prop.itemProperties.length) {
                            return data.settings.map((sett, j) => {
                                const arrProps = prop.itemProperties
                                    .find(ip => ip.name === data[prop.refProperty]);

                                if (!arrProps) return null;
                                const arrProp = arrProps.properties.find(ap => ap.name === sett.name);

                                return (
                                    <li key={`help${sett.name}${j}`}>
                                        <SourceReplacer source={buildSource(arrProp.description)} />
                                    </li>
                                )
                            })
                        }
                        if (!!prop.description) {
                            return (
                                <li key={`help${prop.name}${index}`}>
                                    <SourceReplacer source={buildSource(prop.description)} />
                                </li>
                            );
                        }
                        else return null;
                    })}
                </ul>
            </Card.Body>
        </Card>
    )
}
HelpCard.propTypes = {
    data: PropTypes.object.isRequired,
}

export default HelpCard;
