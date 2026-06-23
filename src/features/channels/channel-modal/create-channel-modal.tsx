import { useState } from "react";
import { useCreateChannelMutation } from "@/features/channels/hooks/use-create-channels-mutation";

interface CreateChannelModalProps {
  isOpen: boolean;
  onClose: () => void;
  guildId: string;
}

export default function CreateChannelModal({
  isOpen,
  onClose,
  guildId,
}: CreateChannelModalProps) {
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("");

  const mutation = useCreateChannelMutation();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutation.mutate(
      {
        guildId,
        body: {
          name,
          topic,
          type: "TEXT",
          position: 1,
          nsfw: false,
        },
      },
      {
        onSuccess: () => {
          setName("");
          setTopic("");
          onClose();
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-md rounded-lg bg-[#11111d] p-6 shadow-xl border border-white/10">

        <h2 className="text-lg font-semibold text-white mb-4">
          Create Channel
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="text-sm text-gray-400">
              Channel Name
            </label>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="general"
              className="mt-1 w-full rounded-md bg-[#1a1a2e] px-3 py-2 text-white outline-none border border-white/10 focus:border-indigo-500"
              required
            />
          </div>


          <div>
            <label className="text-sm text-gray-400">
              Topic
            </label>

            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="What is this channel about?"
              className="mt-1 w-full rounded-md bg-[#1a1a2e] px-3 py-2 text-white outline-none border border-white/10 focus:border-indigo-500 resize-none"
              rows={3}
            />
          </div>


          <div className="flex justify-end gap-3 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-400 hover:text-white"
            >
              Cancel
            </button>


            <button
              type="submit"
              disabled={mutation.isPending}
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-500 disabled:opacity-50"
            >
              {mutation.isPending ? "Creating..." : "Create Channel"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}