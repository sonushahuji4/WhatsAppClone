import searchIcon from '../../../static/images/searchIcon.svg';

const ContactSearch = (): JSX.Element => {
    return (
            <div className='search-container'>
                <div className='search'>
                    <div className='search-icon'>
                        <img src={searchIcon} alt="Img Not Found"></img>
                    </div>
                    <div className='search-input'>
                        <input type="text" name="search-text" placeholder='Search or Start a new chat'></input>
                    </div>
                </div>
            </div>
    );
}

export default ContactSearch;