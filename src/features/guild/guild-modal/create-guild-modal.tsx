import { useState } from 'react';
import { useCreateGuildMutation } from '../hooks/use-create-guild-mutation';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CreateGuildModal({
  isOpen,
  onClose,
}: Props) {
  const mutation = useCreateGuildMutation();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    iconUrl: '',
  });

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    mutation.mutate(formData, {
      onSuccess: () => {
        setFormData({
          name: '',
          description: '',
          iconUrl: '',
        });

        onClose();
      },
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#111827] rounded-xl p-6 w-[90%] max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">
            Create Guild
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400"
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Guild Name"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            className="w-full rounded-lg bg-[#1F2937] p-3 text-white"
          />

          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            className="w-full rounded-lg bg-[#1F2937] p-3 text-white"
          />

          <input
            type="text"
            placeholder="Icon URL"
            value={formData.iconUrl}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                iconUrl: e.target.value,
              }))
            }
            className="w-full rounded-lg bg-[#1F2937] p-3 text-white"
          />

          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full bg-indigo-600 hover:bg-indigo-500 rounded-lg py-3 text-white"
          >
            {mutation.isPending
              ? 'Creating...'
              : 'Create Guild'}
          </button>
        </form>
      </div>
    </div>
  );
}