import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ApiRoutes } from '@/utils/routeAPI';
import { X } from 'lucide-react';
import { SidebarComp } from '@/components/sidebarcomp';

const Test: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tags, setTags] = useState<{ _id: string; title: string }[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [filteredTags, setFilteredTags] = useState<{ _id: string; title: string }[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  const fetchTags = async () => {
    try {
      const response = await axios.get(ApiRoutes.alltags); // Replace with your endpoint
      setTags(response.data.tags);
      setFilteredTags(response.data.tags);
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  const openModal = () => {
    setIsOpen(true);
    fetchTags();
  };

  const closeModal = () => {
    setIsOpen(false);
    setInputValue('');
    setFilteredTags([]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    const filtered = tags
      .filter((tag) => tag.title.toLowerCase().includes(value.toLowerCase()))
      .slice(0, 5);
    setFilteredTags(filtered);
  };

  const addTag = async () => {
    if (!inputValue.trim()) return;

    const existingTag = tags.find((tag) => tag.title === inputValue.trim());

    if (existingTag) {
      setSelectedTags([...selectedTags, existingTag.title]);
    } else {
      try {
        await axios.post('/createtag', { title: inputValue.trim() }); // Replace with your endpoint
        setTags([...tags, { _id: Date.now().toString(), title: inputValue.trim() }]);
        setSelectedTags([...selectedTags, inputValue.trim()]);
      } catch (error) {
        console.error('Error adding tag:', error);
      }
    }
    setInputValue('');
  };

  return (
//     <div>
//       <button onClick={openModal} className="px-4 py-2 bg-purple-500 text-white rounded">
//         Open Tag Modal
//       </button>

//       {isOpen && (
//         <div
//           className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300"
//           onClick={closeModal}  // Close modal when clicking background
//         >
//           <div
//             onClick={(e) => e.stopPropagation()} // Prevents modal click from closing it
//             className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md transform transition-transform duration-300 scale-100"
//           >
//             <h2 className="text-white text-xl mb-4">Select or Add Tags</h2>
//             <button className='absolute top-4 right-6  rounded-full text-xs' onClick={closeModal}><X  className='h-5 w-5'/></button>
//             <input
//               type="text"
//               value={inputValue}
//               onChange={handleInputChange}
//               onKeyDown={(e) => e.key === 'Enter' && addTag()}
//               placeholder="Type to search or add a tag"
//               className="w-full px-3 py-2 border rounded-lg shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-200"
//             />

//             {inputValue && (
//               <ul className="bg-gray-700 mt-2 rounded-lg max-h-40 overflow-auto">
//                 {filteredTags.map((tag) => (
//                   <li
//                     key={tag._id}
//                     onClick={() => {
//                       setSelectedTags([...selectedTags, tag.title]);
//                       setInputValue('');
//                     }}
//                     className="px-3 py-2 text-white hover:bg-purple-600 cursor-pointer"
//                   >
//                     {tag.title}
//                   </li>
//                 ))}
//                 {filteredTags.length === 0 && (
//                   <li className="text-gray-400 px-3 py-2">No matching tags</li>
//                 )}
//               </ul>
//             )}

//             <div className="flex flex-wrap mt-4 gap-2">
//               {selectedTags.map((tag, index) => (
//                 <div
//                   key={index}
//                   className="flex items-center bg-purple-400/20 px-2 py-1 rounded-lg text-sm"
//                 >
//                   {tag}
//                   <button
//                     type="button"
//                     onClick={() => setSelectedTags(selectedTags.filter((_, i) => i !== index))}
//                     className="ml-2 text-red-600 hover:text-red-800"
//                   >
//                     &times;
//                   </button>
//                 </div>
//               ))}
//             </div>

//             <div className="flex justify-end mt-4">
//               <button
//                 onClick={closeModal}
//                 className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

// <div className='flex flex-col gap-10'>
//         <div className='bg-red-300'>
//           Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam doloribus laborum obcaecati impedit praesentium ex, quam pariatur quo maiores hic doloremque similique, mollitia veniam laudantium, molestiae labore quos quaerat voluptatibus?
//         </div>
//         <div className='bg-blue-300'>
//           Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam doloribus laborum obcaecati impedit praesentium ex, quam pariatur quo maiores hic doloremque similique, mollitia veniam laudantium, molestiae labore quos quaerat voluptatibus?
//         </div>
//         <div className='bg-red-300'>
//           Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam doloribus laborum obcaecati impedit praesentium ex, quam pariatur quo maiores hic doloremque similique, mollitia veniam laudantium, molestiae labore quos quaerat voluptatibus?
//         </div>
//         <div className='bg-blue-300'>
//           Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam doloribus laborum obcaecati impedit praesentium ex, quam pariatur quo maiores hic doloremque similique, mollitia veniam laudantium, molestiae labore quos quaerat voluptatibus?
//         </div>
//         <div className='bg-red-300'>
//           Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam doloribus laborum obcaecati impedit praesentium ex, quam pariatur quo maiores hic doloremque similique, mollitia veniam laudantium, molestiae labore quos quaerat voluptatibus?
//         </div>
//         <div className='bg-blue-300'>
//           Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam doloribus laborum obcaecati impedit praesentium ex, quam pariatur quo maiores hic doloremque similique, mollitia veniam laudantium, molestiae labore quos quaerat voluptatibus?
//         </div>
//         <div className='bg-red-300'>
//           Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam doloribus laborum obcaecati impedit praesentium ex, quam pariatur quo maiores hic doloremque similique, mollitia veniam laudantium, molestiae labore quos quaerat voluptatibus?
//         </div>
//         <div className='bg-red-300'>
//           Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam doloribus laborum obcaecati impedit praesentium ex, quam pariatur quo maiores hic doloremque similique, mollitia veniam laudantium, molestiae labore quos quaerat voluptatibus?
//         </div>
//         <div className='bg-red-300'>
//           Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam doloribus laborum obcaecati impedit praesentium ex, quam pariatur quo maiores hic doloremque similique, mollitia veniam laudantium, molestiae labore quos quaerat voluptatibus?
//         </div>
//         <div className='bg-blue-300'>
//           Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam doloribus laborum obcaecati impedit praesentium ex, quam pariatur quo maiores hic doloremque similique, mollitia veniam laudantium, molestiae labore quos quaerat voluptatibus?
//         </div>
//         <div className='bg-red-300'>
//           Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam doloribus laborum obcaecati impedit praesentium ex, quam pariatur quo maiores hic doloremque similique, mollitia veniam laudantium, molestiae labore quos quaerat voluptatibus?
//         </div>
//         <div className='bg-blue-300'>
//           Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam doloribus laborum obcaecati impedit praesentium ex, quam pariatur quo maiores hic doloremque similique, mollitia veniam laudantium, molestiae labore quos quaerat voluptatibus?
//         </div>
//         <div className='bg-red-300'>
//           Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam doloribus laborum obcaecati impedit praesentium ex, quam pariatur quo maiores hic doloremque similique, mollitia veniam laudantium, molestiae labore quos quaerat voluptatibus?
//         </div>
//         <div className='bg-blue-300'>
//           Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam doloribus laborum obcaecati impedit praesentium ex, quam pariatur quo maiores hic doloremque similique, mollitia veniam laudantium, molestiae labore quos quaerat voluptatibus?
//         </div>
//         <div className='bg-red-300'>
//           Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam doloribus laborum obcaecati impedit praesentium ex, quam pariatur quo maiores hic doloremque similique, mollitia veniam laudantium, molestiae labore quos quaerat voluptatibus?
//         </div>
//         <div className='bg-red-300'>
//           Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam doloribus laborum obcaecati impedit praesentium ex, quam pariatur quo maiores hic doloremque similique, mollitia veniam laudantium, molestiae labore quos quaerat voluptatibus?
//         </div>
//         <div className='bg-red-300'>
//           Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam doloribus laborum obcaecati impedit praesentium ex, quam pariatur quo maiores hic doloremque similique, mollitia veniam laudantium, molestiae labore quos quaerat voluptatibus?
//         </div>
//         <div className='bg-blue-300'>
//           Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam doloribus laborum obcaecati impedit praesentium ex, quam pariatur quo maiores hic doloremque similique, mollitia veniam laudantium, molestiae labore quos quaerat voluptatibus?
//         </div>
//         <div className='bg-red-300'>
//           Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam doloribus laborum obcaecati impedit praesentium ex, quam pariatur quo maiores hic doloremque similique, mollitia veniam laudantium, molestiae labore quos quaerat voluptatibus?
//         </div>
//         <div className='bg-blue-300'>
//           Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam doloribus laborum obcaecati impedit praesentium ex, quam pariatur quo maiores hic doloremque similique, mollitia veniam laudantium, molestiae labore quos quaerat voluptatibus?
//         </div>
//         <div className='bg-red-300'>
//           Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam doloribus laborum obcaecati impedit praesentium ex, quam pariatur quo maiores hic doloremque similique, mollitia veniam laudantium, molestiae labore quos quaerat voluptatibus?
//         </div>
//         <div className='bg-blue-300'>
//           Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam doloribus laborum obcaecati impedit praesentium ex, quam pariatur quo maiores hic doloremque similique, mollitia veniam laudantium, molestiae labore quos quaerat voluptatibus?
//         </div>
//         <div className='bg-red-300'>
//           Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam doloribus laborum obcaecati impedit praesentium ex, quam pariatur quo maiores hic doloremque similique, mollitia veniam laudantium, molestiae labore quos quaerat voluptatibus?
//         </div>
//         <div className='bg-red-300'>
//           Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam doloribus laborum obcaecati impedit praesentium ex, quam pariatur quo maiores hic doloremque similique, mollitia veniam laudantium, molestiae labore quos quaerat voluptatibus?
//         </div>
//       </div>
//     </div>
<div>
  <SidebarComp />
</div>
  );
};

export default Test;
