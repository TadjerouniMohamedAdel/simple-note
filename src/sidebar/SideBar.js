import React, { Component } from 'react'
import { withStyles } from "@material-ui/core/styles"
import styles from './styles'
import List from '@material-ui/core/List'
import {Divider,Button} from '@material-ui/core'
import SideBarItem from '../sidebaritem/SideBarItem'

class SideBar extends Component {
    constructor(props){
        super(props)
        this.state ={
            addingNote:false,
            title:null
        }
    }
    
    newNoteBtnClick = ()=>{
       this.setState({
           addingNote:!this.state.addingNote,
           title:null
       })
    }
    updateTitle =(title)=>{
       this.setState({title})
    }
    newNote = ()=>{
        this.props.newNote(this.state.title)
        this.setState({title:null,addingNote:false})
    }

    selectNote = (n,i)=>{
        this.props.selectNote(n,i)
    }

    deleteNote = (note)=>{
        this.props.deleteNote(note)
    }

    render() {
        const {classes,selectedNoteIndex,notes } = this.props
        return (
            <div className={classes.sidebarContainer}>
                <Button 
                    onClick={this.newNoteBtnClick}
                    className={classes.newNoteBtn}
                >
                    {!this.state.addingNote ? 'New Note' : 'Cancel'}
                </Button>
                {
                    this.state.addingNote ? (
                        <div>
                            <input  className={classes.newNoteInput} 
                                    placeholder="Entre note title"
                                    onKeyUp={(event)=> this.updateTitle(event.target.value)}
                            />
                            <Button 
                                className={classes.newNoteSubmitBtn}
                                onClick={this.newNote}
                            >
                                Submit Note
                            </Button>
                        </div>
                    ) : null
                }
                <List>
                    {
                        notes.map((_note,_index)=>{
                            return(
                                <div key={_index}>
                                    <SideBarItem 
                                        _note={_note} 
                                        _index={_index} 
                                        selectedNoteIndex={selectedNoteIndex} 
                                        selectNote={this.selectNote} 
                                        deleteNote={this.deleteNote}
                                    />
                                    <Divider></Divider>
                                </div>
                            )
                        })
                    }
                </List>
            </div>
        )
    }
}
export default withStyles(styles)(SideBar)