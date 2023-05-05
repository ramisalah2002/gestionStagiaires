<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//Administrateur
Route::apiResource('administrateur',\App\Http\Controllers\AdministrateurController::class);

//DemandeStage
Route::apiResource('demandeStage',\App\Http\Controllers\DemandeStageController::class);

//Encadrant
Route::apiResource('encadrant',\App\Http\Controllers\EncadrantController::class);

//Presentation
Route::apiResource('presentation',\App\Http\Controllers\PresentationController::class);

//Projet
Route::apiResource('projet',\App\Http\Controllers\ProjetController::class);

//Rapport
Route::apiResource('rapport',\App\Http\Controllers\RapportController::class);

//Reunion
Route::apiResource('reunion',\App\Http\Controllers\ReunionController::class);

//Stage
Route::apiResource('stage',\App\Http\Controllers\StageController::class);

//Stagiaire
Route::apiResource('stagiaire',\App\Http\Controllers\StagiaireController::class);

//User
Route::apiResource('user',\App\Http\Controllers\UserController::class);

//Utilisateur
Route::apiResource('utilisateur',\App\Http\Controllers\UtilisateurController::class);
