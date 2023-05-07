<?php

namespace App\Http\Controllers;

use App\Models\Realisation;
use Illuminate\Http\Request;

class RealisationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $realisation = Realisation::all();
        return response()->json($realisation);
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
        $realisation = new Realisation([
            'dateDebut' => $request->input('dateDebut'),
            'duree' => $request->input('duree'),
            'stagiaire_id' => $request->input('stagiaire_id'),
            'encadrant_id' => $request->input('encadrant_id'),
        ]);
        $realisation->save();
        return response()->json('');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $realisation = Realisation::find($id) ;
        return response()->json($realisation) ;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $realisation = Realisation::find($id) ;
        $realisation->update($request->all());
        return response()->json('');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $realisation = Realisation::find($id) ;
        $realisation->delete();
        return response()->json('');
    }
}
