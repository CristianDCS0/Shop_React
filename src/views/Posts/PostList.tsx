import { TypePost } from "@/types/TypePost"
import { usePosts } from "@/Context/PostContext";

//Shadcn components
import {Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import {Trash, Pencil, Eye, Save} from "lucide-react";
export default function PostList() {
    const {handleCreate, handleDelete, posts, newPost, setNewPost } = usePosts ();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewPost({ ...newPost, [name]: value }); // Actualizar el nuevo post
    };

    //method for deleting posts

    // return of PostList.tsx
    return (
        <>
            <h1>Posts</h1>
            {posts.length === 0 && <p>Loading...</p>}
            <div className="">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="default">Create Post</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Create post</DialogTitle>
                            <DialogDescription>
                                Create your post here. Click save when you're done.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="title" className="text-right">
                                    Title
                                </Label>
                                <Input name="title" className="col-span-3" type="text" placeholder="Title" value={newPost.title} onChange={handleChange}/>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="description" className="text-right">
                                    Description
                                </Label>
                                <Input name="description" className="col-span-3" type="text" placeholder="Description" value={newPost.description} onChange={handleChange}/>
                            </div>
                        </div>
                        <DialogFooter className="sm:justify-end">
                            <DialogClose asChild>
                                <Button variant="secondary" type="button" onClick={handleCreate}>
                                    <Save/> Save
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>


            <Table>
                <TableCaption>A list of Posts</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">#</TableHead>
                        <TableHead className="w-[250px]">Title</TableHead>
                        <TableHead className="w-[250px]">Description</TableHead>
                        <TableHead className="w-[250px]">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {posts.map((post: TypePost) => (
                        <TableRow key={post.id}>
                            <TableCell className="font-medium">{post.id}</TableCell>
                            <TableCell>{post.title}</TableCell>
                            <TableCell className="font-medium">{post.description}</TableCell>
                            <TableCell className="flex items-center justify-center">
                                <Button variant="default" size="icon" type="button" className="mr-2.5" >
                                    <Pencil/>
                                </Button>
                                <Button variant="secondary" size="icon" className="mr-2.5" type="button" onClick={() => handleDelete(post.id)} >
                                    <Trash/>
                                </Button>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" size="icon">
                                            <Eye/>
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-md">
                                        <DialogHeader>
                                            <DialogTitle>Info of {post.title}</DialogTitle>
                                            <DialogDescription>
                                                Anyone who has this link will be able to view this.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="flex items-center space-x-2">
                                            <div className="grid flex-1 gap-2">
                                                <p><strong className="">id:</strong>{" "+post.id}</p>
                                                <p><strong className="">Title:</strong>{" "+    post.title}
                                                </p>
                                                <p><strong className="">Description:</strong>{" "+post.description}
                                                </p>
                                                <p><strong className="">Created:</strong>{" "+post.created_at}</p>
                                            </div>
                                        </div>
                                        <DialogFooter className="sm:justify-end">
                                            <DialogClose asChild>
                                                <Button type="button" variant="default">
                                                Close
                                                </Button>
                                            </DialogClose>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>Total</TableCell>
                        <TableCell className="text-right">{posts.length}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </>
    );
}