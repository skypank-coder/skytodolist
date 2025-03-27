import React, { useState, useEffect } from 'react';
import { Sun, Moon, Calendar, Clock, CheckCircle2, PlusCircle, Trash2, ListTodo, CheckSquare } from 'lucide-react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  deadline: Date;
}

const QUOTES = [
  "The only way to do great work is to love what you do. - Steve Jobs",
  "Don't watch the clock; do what it flows. - Sam Levenson",
  "Success is not final, failure is not fatal. - Winston Churchill",
  "The future depends on what you do today. - Mahatma Gandhi",
  "Small progress is still progress. - Anonymous"
];

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [deadline, setDeadline] = useState('');
  const [quote, setQuote] = useState('');

  useEffect(() => {
    setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
    const interval = setInterval(() => {
      setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
    }, 86400000);
    return () => clearInterval(interval);
  }, []);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim() || !deadline) return;

    const todo: Todo = {
      id: crypto.randomUUID(),
      text: newTodo,
      completed: false,
      createdAt: new Date(),
      deadline: new Date(deadline)
    };

    setTodos([...todos, todo]);
    setNewTodo('');
    setDeadline('');
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const completedTodos = todos.filter(todo => todo.completed).length;
  const totalTodos = todos.length;

  return (
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-3 mb-4">
            <ListTodo size={32} className="text-blue-600" />
            <h1 className="text-4xl font-bold">TaskFlow</h1>
          </div>
          
          <div className="flex items-center gap-6 w-full justify-between">
            <div className="flex items-center gap-2">
              <CheckSquare size={20} className="text-green-500" />
              <span className="text-sm">{completedTodos}/{totalTodos} completed</span>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full transition-colors duration-200 ${
                darkMode ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {darkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </div>
        </div>

        <form onSubmit={addTodo} className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new task..."
              className={`flex-1 p-3 rounded-lg ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow`}
            />
            <input
              type="datetime-local"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className={`p-3 rounded-lg ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow`}
            />
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <PlusCircle size={20} />
            Add Task
          </button>
        </form>

        <div className="space-y-4">
          {todos.map(todo => (
            <div
              key={todo.id}
              className={`p-4 rounded-lg ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              } shadow-lg transform transition-all duration-200 hover:scale-[1.02]`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className={`mt-1 transition-colors duration-200 ${
                      todo.completed ? 'text-green-500' : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <CheckCircle2 size={20} />
                  </button>
                  <div className="flex-1">
                    <p className={`transition-all duration-200 ${
                      todo.completed ? 'line-through text-gray-500' : ''
                    }`}>
                      {todo.text}
                    </p>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar size={16} />
                        Created: {todo.createdAt.toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={16} />
                        Due: {todo.deadline.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-500 hover:text-red-600 transition-colors duration-200"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className={`mt-8 p-6 rounded-lg text-center ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        } shadow-lg transform transition-all duration-200 hover:shadow-xl`}>
          <p className="italic text-gray-500">{quote}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
