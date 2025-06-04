const PostCard = () => {
    return(
        <>
            <div className={"post-card"}>
                <div className={'side-container'}>
                    <img src="/assets/profile-photo.png" alt="Profile" />
                </div>

                <div className={'details-container'}>
                    <div className={'user-info-container'}>
                        <h4>User name</h4>
                        <p>13 mei</p>
                    </div>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. </p>
                    <div className={'actions-container'}>
                        <div className={'actions-box'}>
                            <img className={'action-images'} src="/assets/heart-icon.png" alt=""/>
                            <p>20K</p>
                        </div>
                        <div className={'actions-box'}>
                            <img className={'action-images'} src="/assets/comments-icon.png" alt=""/>
                            <p>1.5D</p>
                        </div>
                        <div className={'actions-box'}>
                            <img className={'action-images'} src="/assets/share-icon.png" alt=""/>
                            <p>889</p>
                        </div>
                    </div>
                </div>
            </div>
            <hr className={'divider'} />
        </>

    )
}

export default PostCard;