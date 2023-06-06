<?php

namespace App\Http\Controllers;

use App\Models\Equipe;
use Illuminate\Http\Request;
use Carbon\Carbon;


class EquipeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $equipe = Equipe::all();
        return response()->json($equipe);
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
        $equipe = new Equipe([
            'nom_equipe' => $request->input('nom_equipe'),
            'encadrant_id' => $request->input('encadrant_id'),
        ]);
        $equipe->save();
        return response()->json('');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $equipe = Equipe::find($id) ;
        return response()->json($equipe);
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
        $equipe = Equipe::find($id);
        $equipe->update($request->all());
        return response()->json('');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $equipe = Equipe::find($id);
        $equipe->delete();
        return response()->json('');
    }

    /*
     * Equipe Details
     */
    public function getEquipesDetails(Request $request)
    {
        $equipes = Equipe::with(['stagiaires' => function($query){
            $query->with('stage', 'equipe.projets');
        }, 'projets.technologies'])->get();

        foreach($equipes as $equipe){
            foreach($equipe->stagiaires as $stagiaire){
                // Calculer la date de fin du stage
                $startDate = Carbon::createFromFormat('Y-m-d', $stagiaire->stage->date_Debut);
                $endDate = $startDate->copy()->addMonths($stagiaire->stage->duree);
                $stagiaire->stage->date_Fin = $endDate->toDateString();

                // Calculer les jours restants
                $now = Carbon::now();
                $stagiaire->stage->jours_restants = $endDate->diffInDays($now);

                foreach($stagiaire->equipe->projets as $projet){
                    $stagiaire->projet = $projet;
                }
            }

            $equipe_images = [];
            foreach($equipe->stagiaires as $stagiaire){
                array_push($equipe_images, $stagiaire->image);
            }
            $equipe->equipe_images = $equipe_images;

            $progres_total = 0;
            foreach($equipe->projets as $projet){
                $progres_total += $projet->avancements()->sum('valeur');
            }
            $equipe->progres_total = $progres_total / $equipe->projets->count();
        }

        return response()->json($equipes);
    }






}
