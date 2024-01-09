import React, { useState } from 'react'
import { BsPlusLg } from "react-icons/bs"
import { Modal, Box, Button } from "@mui/material"
import { searchUsers } from '../apis/auth';
import { RxCross2 } from "react-icons/rx"
import { useEffect } from 'react';
import { createGroup } from '../apis/chat';
import { fetchChats } from '../redux/chatsSlice';
import { useDispatch } from 'react-redux';
import Search from './group/Search';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 400,
  bgcolor: 'background.paper',

  boxShadow: 24,
  p: 2

};
function Group() {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);
  const [chatName, setChatName] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [search, setSearch] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedUser, setSelectedUsers] = useState([])
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    setSearch("")
    setSelectedUsers([])
  }
  const handleFormSearch = async (e) => {
    setSearch(e.target.value)
  }
  const handleClick = (e) => {
    if (selectedUser.includes(e)) {
      return
    }
    setSelectedUsers([...selectedUser, e])
  }

  const deleteSelected = (ele) => {
    setSelectedUsers(selectedUser.filter((e) => e._id !== ele._id))
  }
  const handleSubmit = async () => {
    if (selectedUser.length >= 2) {

      await createGroup({
        chatName,
        users: JSON.stringify(selectedUser.map((e) => e._id))
      })
      dispatch(fetchChats())
      handleClose()
    }
  }
  useEffect(() => {
    const searchChange = async () => {
      setIsLoading(true)
      const { data } = await searchUsers(search)
      setSearchResults(data)
      setIsLoading(false)
    }
    searchChange()
  }, [search])
  useEffect(() => {
  }, [])
  return (
    <div className='mb-2 rounded'>
      <button className=' transition duration-150 ease-in-out' onClick={handleOpen}>

        <div className='flex justify-start'>
          <button className='text-[11px] font-normal tracking-wide flex items-center gap-x-1 bg-[#f6f6f6] text-[#1f2228] py-1 -mb-7 mt-2  px-2 rounded'>New Group <BsPlusLg /></button>
        </div>
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className='rounded'>
          <h5 className='text-[18px] text-[#111b21] font-medium text-center'>Create A Group</h5>

          <form onSubmit={(e) => e.preventDefault()} className='flex flex-col gap-y-3 mt-3'>

            <input onChange={(e) => setChatName(e.target.value)} className="border-[#c4ccd5] border-[1px]   rounded text-[13.5px] py-[4px] px-2 w-[100%]" type="text" name="chatName" placeholder="Group Name" required />
            <input onChange={handleFormSearch} className="border-[#c4ccd5] border-[1px] rounded text-[13.5px] py-[4px] px-2 w-[100%]" type="text" name="users" placeholder="add users" />
            <div className='flex -mt-2'>

              {
                selectedUser?.map((e) => {
                  return (
                    <Button key={e} onClick={() => deleteSelected(e)} className='flex items-center gap-x-1 ' variant='outlined' color='info'>
                      <span >{e.name}</span>
                      <RxCross2 />
                    </Button>
                  )
                })
              }
            </div>


            <Search isLoading={isLoading} handleClick={handleClick} search={search} searchResults={searchResults} />

            <div className='flex justify-end mt-3'>
              <Button onClick={handleSubmit} className=' text-[15px] ' variant='contained' color='primary' type='submit'>Create</Button>
            </div>
          </form>


        </Box>
      </Modal>
    </div>
  )
}

export default Group