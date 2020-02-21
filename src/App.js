import React, { Component } from 'react'
import SideBar from './sidebar/SideBar'
import Editor from './editor/Editor'
import  './App.css'
const firebase =require('firebase')
export default class App extends Component {
  constructor(props){
    super(props)
    this.state ={
      selectedNoteIndex:null,
      selectedNote:null,
      notes:[]
    }
  }

  componentDidMount =()=>{
      firebase.firestore().collection('notes').onSnapshot(serverUpdate =>{
          const notes = serverUpdate.docs.map(doc => {
                const data = doc.data()
                data["id"]=doc.id
                return data
            })
          this.setState({notes})
      })
  }

  

  selectNote = (note,index)=>{
    this.setState({selectedNote:note,selectedNoteIndex:index})
  }
  deleteNote = async (note)=>{
    const noteIndex=this.state.notes.indexOf(note)
    await this.setState({notes:this.state.notes.filter((_note)=>note!=_note)})
    if(this.state.selectedNoteIndex == noteIndex){
      this.setState({selectedNoteIndex:null,selectedNote:null})
    }else{
      this.state.notes.length > 1 ?
                                  this.selectNote(this.state.notes[this.state.selectedNoteIndex-1],this.state.selectedNoteIndex -1)
                                  :
                                  this.setState({selectedNoteIndex:null,selectedNote:null}) 
    }
    firebase.firestore().collection('notes').doc(note.id).delete();
  }
  newNote = async (title)=>{
      const note ={
        title,
        body:""
      };
      const newFromDB = await firebase.firestore().collection('notes').add({
          title:note.title,
          body:note.body,
          timestamp:firebase.firestore.FieldValue.serverTimestamp()
      })
      const newID = newFromDB.id
      await this.setState({notes:[...this.state.notes,note]})
      const newNoteIndex= this.state.notes.indexOf(this.state.notes.filter((_note)=>_note.id==newID)[0])
      this.setState({
        selectedNoteIndex:newNoteIndex,
        selectedNote:this.state.notes[newNoteIndex]
      })
    }

  noteUpdate = (id,noteObj)=>{
    firebase.firestore().collection('notes').doc(id).update({
      title:noteObj.title,
      body:noteObj.body,
      timestamp:firebase.firestore.FieldValue.serverTimestamp()
    })
  }

  render() {
    return (
      <div className="app-container">
        <SideBar 
                selectedNoteIndex={this.state.selectedNoteIndex} 
                notes={this.state.notes}
                deleteNote={this.deleteNote}
                selectNote={this.selectNote}
                newNote={this.newNote} 
          />
          {
            this.state.selectedNote !=null && (
              <Editor selectedNote={this.state.selectedNote} selectedNoteIndex={this.state.selectedNoteIndex} notes={this.state.notes} noteUpdate={this.noteUpdate}/>
            )
          }
       
      </div>
    )
  }
}
