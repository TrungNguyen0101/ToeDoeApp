<?php

namespace App\Http\Controllers\Api\V2;

use App\Models\Task;
use App\Http\Controllers\Controller;
use App\Http\Resources\TaskResource;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;

class TaskController extends Controller
{
    public function __construct()
    {
        // hàm construct : áp dùng các policies của model Task
        // -> tự động gọi các phương thức trong policies của model Task
        $this->authorizeResource(Task::class);
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return TaskResource::collection(auth()->user()->tasks()->get());
        // return TaskResource::collection(Task::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $task = $request->user()->tasks()->create($request->validated());
        return TaskResource::make($task);
    }
    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        //Tìm lớp policies của model task và lấy ra View -> kiểm tra quyền
        // $this->authorize("view", $task);

        return TaskResource::make($task);
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $task->update($request->validated());
        return TaskResource::make($task);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        try {
            $task->delete();

            return response()->json([
                'message' => 'Công việc đã được xóa thành công.'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Xóa công việc không thành công.',
            ]);
        }
    }
}