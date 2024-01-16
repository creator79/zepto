"use client";
import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import Image from 'next/image';
import './globals.css';

interface Chip {
  id: number;
  label: string;
  highlighted?: boolean;
}

interface Suggestion {
  name: string;
  avatarUrl: string;
  email: string;
}

interface Chip extends Suggestion {
  id: number;
  label: string;
}


const dummyData: Suggestion[] = [
  { "name": "John Doe", "avatarUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "email": "john@example.com" },
  { "name": "Jane Smith", "avatarUrl": "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "email": "jane@example.com" },
  { "name": "Michael Johnson", "avatarUrl": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "email": "michael@example.com" },
  { "name": "Emily Davis", "avatarUrl": "https://images.unsplash.com/photo-1557296387-5358ad7997bb?q=80&w=1957&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "email": "emily@example.com" },
  { "name": "Daniel Brown", "avatarUrl": "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "email": "daniel@example.com" },
  { "name": "Olivia Wilson", "avatarUrl": "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "email": "olivia@example.com" },
  { "name": "William Martinez", "avatarUrl": "https://plus.unsplash.com/premium_photo-1675461588230-732ec738a0f5?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "email": "william@example.com" },
  { "name": "Sophia Anderson", "avatarUrl": "https://images.unsplash.com/photo-1601412436009-d964bd02edbc?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "email": "sophia@example.com" },
  { "name": "James Taylor", "avatarUrl": "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1795&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "email": "james@example.com" },
  { "name": "Ava Thomas", "avatarUrl": "https://images.unsplash.com/photo-1616766098946-e4fabb7d6da0?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "email": "ava@example.com" }
];




const ChipComponent: React.FC = () => {
  const [input, setInput] = useState('');
  const [chips, setChips] = useState<Chip[]>([]);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchSuggestions = (query: string) => {
    // Simulate an API call to fetch suggestions based on the query
    const filteredSuggestions = dummyData.filter(
      suggestion =>
        (suggestion.name.toLowerCase().includes(query.toLowerCase()) ||
          suggestion.email.toLowerCase().includes(query.toLowerCase())) &&
        !chips.some(chip => chip.label === suggestion.name)
    );
    setSuggestions(filteredSuggestions);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setInput(inputValue);
    fetchSuggestions(inputValue);
  };

  const handleItemClick = (item: Suggestion) => {
    const newChip: Chip = {
      id: chips.length + 1, label: item.name, avatarUrl: item.avatarUrl, email: item.email,
      name: ''
    };
    setChips([...chips, newChip]);
    setInput('');
    setSuggestions([]);
  };

  const handleChipDelete = (chip: Chip) => {
    setChips(chips.filter(c => c.id !== chip.id));
  };
  const handleChipClick = (chip: Chip) => {
    // Add a class to highlight the selected chip
    setChips(chips.map(c => ({ ...c, highlighted: c.id === chip.id })));
  };



  useEffect(() => {
    const handleBackspace = (e: KeyboardEvent) => {
      if (e.key === 'Backspace' && input === '') {
        const highlightedChip = chips.find(chip => chip.highlighted);
        if (highlightedChip) {
          // If a chip is highlighted, remove it
          setChips(chips.filter(chip => chip.id !== highlightedChip.id));
        } else {
          // If no chip is highlighted, highlight the last chip
          const lastChip = chips[chips.length - 1];
          if (lastChip) {
            handleChipClick(lastChip);
          }
        }
      }
    };

    document.addEventListener('keydown', handleBackspace);
    return () => {
      document.removeEventListener('keydown', handleBackspace);
    };
  }, [input, chips]);

  return (
    <div className="flex flex-col items-center mt-4">
      <h1 className="text-2xl font-bold font-serif mb-4 text-blue-700">Pick Users</h1>
      <div className="relative w-full  sm:max-w-20 md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto">
        <div className="flex flex-wrap">
          {chips.map(chip => (
            <div
              key={chip.id}
              className={`m-2 chip ${chip.highlighted ? 'highlighted' : ''}`}
              onClick={() => handleChipClick(chip)}
            >
              <Image
                src={chip.avatarUrl}
                alt={chip.label}
                width={300}
                height={300}
                className="chip-avatar rounded-full"
              />
              {chip.label}
              <button onClick={() => handleChipDelete(chip)} className="close-icon">
                X
              </button>
            </div>
          ))}
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            className="flex-1   outline-none  rounded p-2"
            placeholder="Type something..."
          />
          <hr className="my-4 border-t-4 border-blue-700  w-full sm:max-w-20 md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto " />

          {input !== '' && suggestions.length > 0 && (
            <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-b-lg mt-1">
              {suggestions.map(suggestion => (
                <div
                  key={suggestion.email}
                  className="px-2 py-2 cursor-pointer hover:bg-gray-200 flex items-center justify-between"
                  onClick={() => handleItemClick(suggestion)}
                >
                  <Image
                    src={suggestion.avatarUrl}
                    alt={suggestion.name}
                    width={300}
                    height={300}
                    className="chip-avatar inline-block mr-2 rounded-full"
                  />
                  <div className="flex-1">
                    <div>
                      <span className="font-bold">{suggestion.name}</span>
                      <span className="text-gray-600 ml-2">{suggestion.email}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default ChipComponent;