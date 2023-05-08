<?php

namespace App\Http\Controllers;

use App\Models\DemandeStage;
use Illuminate\Http\Request;

class DemandeStageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $demandeStage = DemandeStage::all();
        return response()->json($demandeStage);
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
        $demandeStage = new DemandeStage([
            'date_demande' => $request->input('date_demande'),
            'utilisateur_id' => $request->input('utilisateur_id'),
            'administrateur_id' => $request->input('administrateur_id'),
            'stage_id' => $request->input('stage_id'),
        ]);
        $demandeStage->save();
        return response()->json('');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $demandeStage = DemandeStage::find($id);
        return response()->json($demandeStage);
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
        $demandeStage = DemandeStage::find($id);
        $demandeStage->update($request->all());
        return response()->json('');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $demandeStage = DemandeStage::find($id);
        $demandeStage->delete();
        return response()->json('');
    }
}