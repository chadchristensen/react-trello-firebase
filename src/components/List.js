import React from 'react';
import Card from './Card';
import PropTypes from 'prop-types';
import { cardsRef } from '../firebase';

class List extends React.Component {
    state = {
        currentCards: []
    }

    nameInput = React.createRef();

    createNewCard = async (e) => {

        try {
            e.preventDefault();
    
            const card = {
                text: this.nameInput.current.value,
                listId: this.props.list.id,
                labels: [],
                createdAt: new Date()
            }
    
            if(card.text && card.listId) {
                await cardsRef.add({ card })
            }
    
            this.nameInput.current.value = '';
            console.log(`new card added: ${card.text}`);

        } catch (err) {
            console.error('Error creating new card: ', err)
        }
        
    }
    render() {
        return (
            <div className="list">
                <div className="list-header">
                    <p>{this.props.list.title}</p>
                </div>
                {Object.keys(this.props.list.cards).map(key => {
                    return (
                        <Card
                            key={key}
                            data={this.props.list.cards[key]}
                        />
                    )
                })}
                <form
                    onSubmit={this.createNewCard} 
                    className="new-card-wrapper"
                >
                    <input
                        type="text"
                        ref={this.nameInput}
                        name="name"
                        placeholder=" + New Card"
                        id=""
                    />
                </form>
            </div>
        )
    }
}

List.propTypes = {
    list: PropTypes.object.isRequired
}

export default List;