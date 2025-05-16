// 'use client';

// import { useEffect, useState } from 'react';
// import { XIcon } from './Icons';

// type HistoryItem = {
//   _id: string;
//   sourceUrl: string;
//   processedUrl?: string;
//   createdAt: Date;
//   status: string;
// };

// type HistoryDialogProps = {
//   open: boolean;
//   onClose: () => void;
//   userId: string;
// };

// export const HistoryDialog = ({ open, onClose, userId }: HistoryDialogProps) => {
//   const [history, setHistory] = useState<HistoryItem[]>([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (open && userId) {
//       fetchHistory();
//     }
//   }, [open, userId]);

//   const fetchHistory = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(`/api/history?userId=${userId}`);
//       const data = await response.json();
//       setHistory(data);
//     } catch (error) {
//       console.error('Failed to fetch history:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
//         <div className="flex justify-between items-center border-b p-4">
//           <h3 className="text-lg font-medium text-gray-900">Processing History</h3>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-500"
//           >
//             <XIcon className="w-6 h-6" />
//           </button>
//         </div>
        
//         <div className="p-4 overflow-y-auto max-h-[65vh]">
//           {loading ? (
//             <div className="flex justify-center py-8">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//             </div>
//           ) : history.length === 0 ? (
//             <p className="text-center text-gray-500 py-8">No history found</p>
//           ) : (
//             <div className="space-y-4">
//               {history.map((item) => (
//                 <div key={item._id} className="border rounded-lg p-4">
//                   <div className="flex justify-between">
//                     <div>
//                       <p className="text-sm text-gray-500">
//                         {new Date(item.createdAt).toLocaleString()}
//                       </p>
//                       <p className={`font-medium ${
//                         item.status === 'completed' ? 'text-green-600' : 
//                         item.status === 'failed' ? 'text-red-600' : 'text-blue-600'
//                       }`}>
//                         {item.status.toUpperCase()}
//                       </p>
//                     </div>
//                     {item.processedUrl && (
//                       <a
//                         href={item.processedUrl}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
//                       >
//                         Download
//                       </a>
//                     )}
//                   </div>
//                   <div className="mt-2 flex space-x-4">
//                     <video 
//                       src={item.sourceUrl} 
//                       controls 
//                       className="w-1/2 h-32 object-cover rounded"
//                     />
//                     {item.processedUrl && (
//                       <video 
//                         src={item.processedUrl} 
//                         controls 
//                         className="w-1/2 h-32 object-cover rounded"
//                       />
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };