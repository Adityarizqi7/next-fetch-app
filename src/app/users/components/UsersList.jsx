import UserCard from "./UserCard"

export default function UsersList(dataUser) {
    return (
        <div className="wrapper-users grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-x-9 gap-y-8">
        {
            dataUser?.dataUser?.map((element, index) => {
                return (
                    <UserCard key={index+1} id={element?.id} first_name={element?.first_name} last_name={element?.last_name} email={element?.email} avatar={element?.avatar} index={index} />
                )
            })
        }
        </div>
    )
}