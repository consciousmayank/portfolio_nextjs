"use client";

import { useState } from "react";
import Modal from "./Modal";
import ProjectForm from "./ProjectForm";

interface AddProjectButtonProps {
  createAction: (formData: FormData) => Promise<void>;
}

export default function AddProjectButton({ createAction }: AddProjectButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Custom action that closes the modal after successful creation
  const handleCreateProject = async (formData: FormData) => {
    try {
      await createAction(formData);
      closeModal(); // Close modal after successful creation
    } catch (error) {
      // Error will be handled by the ProjectForm component
      throw error;
    }
  };

  return (
    <>
      <button
        onClick={openModal}
        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors duration-300"
      >
        Add New Project
      </button>

      {/* Project Creation Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        title="Create New Project"
      >
        <ProjectForm
          mode="create"
          action={handleCreateProject}
        />
      </Modal>
    </>
  );
} 