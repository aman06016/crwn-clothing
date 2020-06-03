import React from 'react';
import './directory.style.scss';
import MenuItem from '../menu-item/menu-item.component'
import {selectDirectorySections} from '../../redux/directory/directory.selector';
import {createStructuredSelector} from 'reselect';

import {connect} from 'react-redux';

const Directory = ({sections})=> (
            <div className='directory-menu'>
                {
                    sections.map( ({id,title,imageUrl,size,linkUrl}) => {
                        return(
                            <MenuItem key={id} title={title} imageUrl={imageUrl} size={size} linkUrl={linkUrl} />
                        );
                        
                        }
                    )
                }
            </div>
        );

    


const mapStateToProps = createStructuredSelector({ 
  sections: selectDirectorySections
});

export default connect(mapStateToProps)(Directory);
