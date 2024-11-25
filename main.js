const notesListEl = document.querySelector(".notes-list");
const saveButtonEl = document.querySelector(".speichern-note");
const deleteButtonEl = document.querySelector(".delete-note");
const newNoteButtonEl = document.querySelector(".create-new");
const titleInputEl = document.getElementById("title-input");
const contentInputEl = document.getElementById("content-input");

saveButtonEl.addEventListener("click", clickSaveButton);
newNoteButtonEl.addEventListener("click", newNote);
deleteButtonEl.addEventListener("click", clickDeleteButton)

displayNotesList();
applyListeners();

function applyListeners(){
  const noteEntriesEls = document.querySelectorAll(".note-entry");

noteEntriesEls.forEach((noteEntry) => {
  noteEntry.addEventListener("click", () => selectNote(noteEntry.getAttribute("data-id")));
});
}

function displayNotesList() {
  const notes = getNotes();

  const sortedNotes = notes.sort(
    (noteA, noteB) => noteB.lastUpdated - noteA.lastUpdated
  );

  let html = "";

  sortedNotes.forEach((note) => {
    html += `
  <div class="note-entry" data-id="${note.id}">
    <div class="note-title">${note.title}</div>
    <div class="note-content-teaser">
      ${note.content}
      </div>
      <div class="note-date">${new Date(note.lastUpdated).toLocaleString(
        "en-us"
      )}</div>
  </div> 
  `;
  });

  notesListEl.innerHTML = html;
}
 
function clickSaveButton(){
  const title = titleInputEl.value;
  const content = contentInputEl.value;

  if(!title || !content) {
    alert("Please enter title and heading.");
    return;
  }



  saveNote(title, content, Number(getCurrentleySelectedId()));

  titleInputEl.value = "";
  contentInputEl.value = "";

  displayNotesList();
  applyListeners();
}

function clickDeleteButton(){
  const currentleySelectedId = getCurrentleySelectedId();

  if(!currentleySelectedId) return;

  deleteNote(currentleySelectedId);

  titleInputEl.value = "";
  contentInputEl.value = "";

  displayNotesList();
  applyListeners();

}

function selectNote(id){
  const selectedNoteEl = document.querySelector(`.note-entry[data-id="${id}"]`);
  
  if(selectedNoteEl.classList.contains("selected-note")) return;

  removeSelectedClassFromAllNotes();

  selectedNoteEl.classList.add("selected-note");

  const notes = getNotes();

  const selectedNote = notes.find((note) => note.id === Number(id));

  if (!selectNote) return;

  titleInputEl.value = selectedNote.title;
  contentInputEl.value = selectedNote.content;
}

function newNote(){
  titleInputEl.value = "";
  contentInputEl.value = "";

  removeSelectedClassFromAllNotes();
}

function removeSelectedClassFromAllNotes(){
  const noteEntriesEls = document.querySelectorAll('.note-entry');
  noteEntriesEls.forEach(noteEntry =>{
    noteEntry.classList.remove("selected-note");
  });
}

function getCurrentleySelectedId(){
  let currentId = undefined;

  const currentlySelectedNoteEl = document.querySelector(".selected-note");

  if(currentlySelectedNoteEl){
    currentId = currentlySelectedNoteEl.getAttribute("data-id");
  }

  return currentId;
}