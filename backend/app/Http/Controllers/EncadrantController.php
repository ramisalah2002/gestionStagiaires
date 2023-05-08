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
        $encadrant = new Encadrant;
        $encadrant->nom = $request->input('nom');
        $encadrant->prenom = $request->input('prenom');
        $encadrant->email = $request->input('email');
        $encadrant->password = $request->input('password');
        $encadrant->telephone = $request->input('telephone');
        $encadrant->dateNaissance = $request->input('dateNaissance');
        $encadrant->genre = $request->input('genre');
        $encadrant->CIN = $request->input('CIN');

        $encadrant->save();

        return response()->json($encadrant);
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