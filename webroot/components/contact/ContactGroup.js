import React from 'react'
import Contact from './Contact'

const ContactGroup = React.createClass({

    render(){
        var {cts,belong} = this.props;
        return (
            <div className="contact_group">
                <div className="ct_belong">{belong}</div>
                {
                    cts.map(ct => <Contact key={ct.id} contact = {ct}/>)
                }

            </div>
        )
    }
})
export default ContactGroup;