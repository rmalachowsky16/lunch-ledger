import { useState, useEffect } from 'react'
import './App.css'

const STORAGE_KEY = 'lunch-ledger-members'

const DEFAULT_MEMBERS = [
  { id: 1, name: 'Rob', count: 0 },
  { id: 2, name: 'Wajdi', count: 0 },
  { id: 3, name: 'Landon', count: 0 },
  { id: 4, name: 'Graham', count: 0 },
  { id: 5, name: 'Charles', count: 0 },
]

function loadMembers() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved)
  } catch {
    // ignore parse errors
  }
  return DEFAULT_MEMBERS
}

function MemberRow({ member, onIncrement, onDecrement, onCountChange, onRemove }) {
  const [inputValue, setInputValue] = useState(String(member.count))
  const [confirmRemove, setConfirmRemove] = useState(false)

  // Keep input in sync when count changes from +/- buttons
  useEffect(() => {
    setInputValue(String(member.count))
  }, [member.count])

  function handleInputChange(e) {
    const val = e.target.value
    // Allow empty string, optional leading minus, then digits only
    if (val === '' || val === '-' || /^-?\d+$/.test(val)) {
      setInputValue(val)
    }
  }

  function commitInput() {
    const parsed = parseInt(inputValue, 10)
    if (!isNaN(parsed)) {
      onCountChange(member.id, parsed)
      setInputValue(String(parsed))
    } else {
      setInputValue(String(member.count))
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') e.target.blur()
  }

  const colorClass =
    member.count > 0 ? 'positive' : member.count < 0 ? 'negative' : ''

  return (
    <div className="member-row">
      <span className="member-name">{member.name}</span>

      <div className="member-controls">
        <button
          className="btn-adjust btn-minus"
          onClick={() => onDecrement(member.id)}
          aria-label={`Decrement ${member.name}`}
        >
          −
        </button>

        <input
          className={`count-input ${colorClass}`}
          type="text"
          inputMode="numeric"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={commitInput}
          onKeyDown={handleKeyDown}
          aria-label={`${member.name}'s lunch count`}
        />

        <button
          className="btn-adjust btn-plus"
          onClick={() => onIncrement(member.id)}
          aria-label={`Increment ${member.name}`}
        >
          +
        </button>

        {confirmRemove ? (
          <div className="confirm-remove">
            <span>Remove?</span>
            <button className="btn-confirm-yes" onClick={() => onRemove(member.id)}>
              Yes
            </button>
            <button className="btn-confirm-no" onClick={() => setConfirmRemove(false)}>
              No
            </button>
          </div>
        ) : (
          <button
            className="btn-remove"
            onClick={() => setConfirmRemove(true)}
            aria-label={`Remove ${member.name}`}
            title={`Remove ${member.name}`}
          >
            ×
          </button>
        )}
      </div>
    </div>
  )
}

export default function App() {
  const [members, setMembers] = useState(loadMembers)
  const [newName, setNewName] = useState('')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(members))
  }, [members])

  function increment(id) {
    setMembers(prev =>
      prev.map(m => (m.id === id ? { ...m, count: m.count + 1 } : m))
    )
  }

  function decrement(id) {
    setMembers(prev =>
      prev.map(m => (m.id === id ? { ...m, count: m.count - 1 } : m))
    )
  }

  function setCount(id, count) {
    setMembers(prev =>
      prev.map(m => (m.id === id ? { ...m, count } : m))
    )
  }

  function removeMember(id) {
    setMembers(prev => prev.filter(m => m.id !== id))
  }

  function addMember(e) {
    e.preventDefault()
    const name = newName.trim()
    if (!name) return
    setMembers(prev => [...prev, { id: Date.now(), name, count: 0 }])
    setNewName('')
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Lunch Ledger</h1>
        <p className="app-subtitle">Who owes lunch?</p>
      </header>

      <main className="ledger">
        <div className="ledger-header">
          <span>Name</span>
          <span>Lunches Owed</span>
        </div>

        {members.length === 0 && (
          <p className="empty-state">
            Nobody owes lunch yet. Add someone below.
          </p>
        )}

        {members.map(member => (
          <MemberRow
            key={member.id}
            member={member}
            onIncrement={increment}
            onDecrement={decrement}
            onCountChange={setCount}
            onRemove={removeMember}
          />
        ))}
      </main>

      <form className="add-member-form" onSubmit={addMember}>
        <input
          className="add-member-input"
          type="text"
          placeholder="New team member name..."
          value={newName}
          onChange={e => setNewName(e.target.value)}
          maxLength={40}
        />
        <button className="btn-add" type="submit" disabled={!newName.trim()}>
          Add Member
        </button>
      </form>
    </div>
  )
}
