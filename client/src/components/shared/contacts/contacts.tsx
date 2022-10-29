import AuthorHeader from './authorHeader';
import ContactSearch from './contactSearch';
import ContactLists from './contactLists';

interface Prpos {
    onContactSelect : ({}: object) => void;
}

const ContactList = ({onContactSelect}: Prpos) => {

    return (
        <div className='contact-list-container'> 
            <AuthorHeader />
            <ContactSearch />
            <div className='contact-lists'>
                <ContactLists 
                    onContactSelect={onContactSelect} />
            </div>
        </div>
    );
}

export default ContactList;