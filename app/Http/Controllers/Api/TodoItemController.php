<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\TodoItem;
use App\Models\Todo;

class TodoItemController extends Controller
{

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $title = (!empty($request->title) && strlen($request->title) <= 255 ? $request->title : false);
        $todo_id = (!empty($request->todo_id) ? $request->todo_id : false);

        if ( $title && $todo_id ) {

            $item = new TodoItem();
            $item->todo_id = $todo_id;
            $item->title = $title;
            $item->save();

            // get data to return the whole new todo with items to render in frontend
            // ( also set updated_at for the while todo for some status )
            $todo = Todo::where('id', $todo_id)->with('items')->first();
            $todo->updated_at = date('Y-m-d H:i:s');
            $todo->save();

            // return statuscode 201 ( created ) with the created todoitem
            return response()->json($todo, 201);

        } else {
            // validation failed
            if ( empty($request->title) || empty($id) ) {
                // return statuscode 400 ( bad request ) with a message
                return response()->json([ 'error' => 'Check required fields' ], 400);

            } else if ( strlen($request->title) > 255 ) {
                // return statuscode 400 ( bad request ) with a message
                return response()->json([ 'error' => 'Check length of required fields' ], 400);
            }

        }
    }



    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $title = (!empty($request->title) && strlen($request->title) <= 255 ? $request->title : false);
        $completed = (!empty($request->completed) && $request->completed == '1' ? 1 : 0); // optional, default to 0

        if ( $title && !empty($id) ) {

            $item = TodoItem::where('id',$id)->first();

            // if NOT found, return empty response with statuscode 404 ( not found )
            if (empty($item)) return response()->json(null, 404);

            $item->completed = $completed;
            $item->title = $title;
            $item->updated_at = date('Y-m-d H:i:s');
            $item->save();


            // get data to return the whole new todo with items to render in frontend
            // ( also set updated_at for the while todo for some status )
            $todo = Todo::where('id', $item->todo_id)->with('items')->first();
            $todo->updated_at = date('Y-m-d H:i:s');
            $todo->save();

            // return statuscode 200 ( ok ) with the updated todoitem
            return response()->json($todo, 200);

        } else {
            // validation failed
            if ( empty($request->title) ) {
                // return statuscode 400 ( bad request ) with a message
                return response()->json([ 'error' => 'Check required fields' ], 400);

            } else if ( strlen($request->title) > 255 ) {
                // return statuscode 400 ( bad request ) with a message
                return response()->json([ 'error' => 'Check length of required fields' ], 400);
            }

        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $item = TodoItem::where('id',$id)->first();

        // if NOT found, return empty response with statuscode 404 ( not found )
        if (empty($item)) return response()->json(null, 404);

        // for return data
        $todo_id = $item->todo_id;

        // else remove it..
        $item->delete();

        // get data to return the whole new todo with items to render in frontend
        // ( also set updated_at for the while todo for some status )
        $todo = Todo::where('id', $todo_id)->with('items')->first();
        $todo->updated_at = date('Y-m-d H:i:s');
        $todo->save();

        // return status code 200
        return response()->json($todo, 200);
    }
}
