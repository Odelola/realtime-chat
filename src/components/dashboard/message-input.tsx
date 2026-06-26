import { useState } from 'react';
import { Plus, Smile, SendHorizonal } from 'lucide-react';

interface MessageInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

const MessageInput = ({ onSend, disabled = false }: MessageInputProps) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-white/10 p-3 sm:p-5">
      <div className="flex items-center gap-2 sm:gap-4 rounded-2xl bg-[#171722] px-4 py-3">
        <button
          disabled={disabled}
          className="text-gray-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus size={18} />
        </button>

        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={disabled}
          className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-gray-500 disabled:opacity-50"
        />

        <button
          disabled={disabled}
          className="text-gray-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Smile size={18} />
        </button>

        <button
          onClick={handleSend}
          disabled={disabled || !input.trim()}
          className="text-gray-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <SendHorizonal size={18} />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;