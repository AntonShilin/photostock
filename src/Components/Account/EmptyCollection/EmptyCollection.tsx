import * as React from 'react';
import { NavLink } from 'react-router-dom';
import "./EmptyCollection.scss";

export interface Props {
    
}
 
export interface State {
    
}
 
class EmptyCollection extends React.Component<Props, State> {
    public render() { 
        return (
            <div className="container-xl empty-collection-bg">
            <div className="row">
              <div className="col">
                <h2>You Haven't Liked Any Photos Yet</h2>
                <span>
                  Discover amazing pictures and like them, to download them later,
                  share them with your colleagues or use it to make your favourite
                  photographer happy.
                </span>
                <NavLink to="/">Discover photos</NavLink>
              </div>
            </div>
          </div>
         );
    }
}
 
export default EmptyCollection;