<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Todo;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $todos = Todo::all();
        return response()->json($todos, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $title = (!empty($request->title) && strlen($request->title) <= 255 ? $request->title : false);

        if ( $title ) {
            // create new
            $todo = new Todo();
            $todo->title = $title;
            $todo->save();

            // return statuscode 201 ( created ) with the created todo
            return response()->json([ 'todo' => $todo ], 201);
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
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $todo = Todo::where('id', $id)->with('items')->first();
        
        // if NOT found, return empty response with statuscode 404 ( not found )
        if (empty($todo)) return response()->json(null, 404);

        // return response with statuscode 200 ( ok )
        return response()->json($todo, 200);
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
        $todo = Todo::where('id', $id)->first();
        
        // if NOT found, return empty response with statuscode 404 ( not found )
        if (empty($todo)) return response()->json(null, 404);

        $title = (!empty($request->title) && strlen($request->title) <= 255 ? $request->title : false);

        if ( $title ) {
            // update title now
            $todo->title = $title;
            $todo->save();

            // return statuscode 200 ( ok ) with the updated todo
            return response()->json([ 'todo' => $todo ], 200);
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
        $todo = Todo::where('id', $id)->with('items')->first();
        
        // if NOT found, return empty response with statuscode 404 ( not found )
        if (empty($todo)) return response()->json(null, 404);

        // else remove it..
        $todo->delete();

        // return status code 200
        return response()->json(null, 200);
    }
}
