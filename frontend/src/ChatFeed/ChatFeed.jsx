import './ChatFeed.css'

const ChatFeed = () => {
  const people = [
    { picture: "https://randomuser.me/api/portraits/men/16.jpg",
      name: "Hugh",
      age: 31,
      id: 0},
    { picture: "https://randomuser.me/api/portraits/men/48.jpg",
      name: "محمدامين",
      age: 23,
      id: 1}
  ]

  const selectDM = (id) => {
    return (
      console.log('user with id: ' + id)
    );
  }

  return (
    <div className="ChatFeed">
      {people.map((person) => (
        <div className='DM' key={person.id}>
          <button onClick={() => selectDM(person.id)}>
            <img className='photo' src={person.picture} alt=''/>
            <p className='name'>{person.name}</p>
          </button>
        </div>
      ))}
    </div>
  );
}

export default ChatFeed;