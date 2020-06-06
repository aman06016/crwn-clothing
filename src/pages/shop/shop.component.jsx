import React, { Component } from 'react';
import CollectionsOverview from '../../components/collection-overview/collection-overview.component';
import CollectionPage from '../collection/collection.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

import {Route} from 'react-router-dom';
import {firestore,convertCollectionsSnapShotToMap} from '../../firebase/firebase.utils';

import {connect} from 'react-redux';
import {updateCollections} from '../../redux/shop/shop.actions';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);


class ShopPage extends Component {
    state = {
        loading : true
    };

    unsubscibeFromSnapshot=null;

    componentDidMount(){
        const {updateCollections}= this.props;
        const collectionRef = firestore.collection('collections');

        collectionRef.onSnapshot(async snapshot => {
            
            const collectionsMap=convertCollectionsSnapShotToMap(snapshot);
            // console.log("aman");
            // console.log(collectionsMap);
            updateCollections(collectionsMap);
            this.setState({loading:false});

        });
    }

    render() {
        const {match}=this.props;
        const {loading} = this.state;
        return(
            <div className="shop-page">
                
                <Route exact path = {`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner isLoading ={loading} {...props}/>} />
                <Route path ={`${match.path}/:collectionId`} 
                render={props => (
                    <CollectionPageWithSpinner isLoading={loading} {...props}/>
                )}
                />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch=> ({
    updateCollections: collectionsMap=> dispatch(updateCollections(collectionsMap))
})

export default connect(null,mapDispatchToProps)(ShopPage);