<?php

namespace App\Http\Controllers;

use App\Models\Encadrant;
use Illuminate\Http\Request;

class EncadrantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $encadrant = Encadrant::all();
        return response()->json($encadrant);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $encadrant = Encadrant::find($id) ;
        return response()->json($encadrant) ;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $encadrant = Encadrant::find($id);
        $encadrant->update($request->all());
        return response()->json('');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $encadrant = Encadrant::find($id);
        $encadrant->delete();
        return response()->json('');
    }
}
